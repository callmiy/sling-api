defmodule Sling.Web.RoomChannel do
  @moduledoc false

  use Sling.Web, :channel
  import Phoenix.View, only: [render: 3]
  import Sling.Web.RoomChannel.Helper

  alias Sling.Web.ChangesetView
  alias Sling.Messages
  alias Sling.Web.Presence
  alias Sling.Users

  def join("rooms:utils", params, socket) do
    response = %{
      user_rooms: render_user_rooms(socket.assigns.current_user.id),
      rooms: render_rooms_list(params),
    }
    {:ok, response, socket}
  end

  def join("rooms:" <> room_id, _payload, socket) do
    {room, response} = render_users_and_msg_for_room(room_id)
    send self(), :after_room_join
    {:ok, response, assign(socket, :room, room)}
  end

  def handle_info(:after_room_join, socket) do
    Presence.track(
      socket, :users, Users.render_user(socket.assigns.current_user)
    )

    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end

  def handle_in("new_message", params, socket) do
    with {:ok, message} <- Messages.create_message(
                              socket.assigns.room,
                              socket.assigns.current_user.id,
                              params
                            ) do
      broadcast(socket, "message_created", render_one_message(socket, message))
      {:reply, :ok, socket}
    else
      {:error, changeset} ->
        {
          :reply,
          {
            :error,
            render(ChangesetView, "error.json", changeset: changeset)
          },
          socket
        }

      _ ->
        {:reply, :unknown_error, socket}
    end
  end

  def handle_in("load rooms", params, socket) do
    {:reply, {:ok, render_rooms_list(params)}, socket}
  end

  def handle_in("new room", params, socket) do
    with {:ok, created_room} <- create_room(
                                  socket.assigns.current_user.id,
                                  params
                                ) do
      broadcast(socket, "room created", created_room)
      {:reply, {:ok, %{room_id: created_room.data.id}}, socket}
    else
      {:error, error} ->
        {:reply, {:error, error}, socket}

      _ ->
        {:reply, :unknown_error, socket}
    end
  end
end
