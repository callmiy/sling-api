defmodule Sling.Web.RoomChannel.Helper do
  @moduledoc """
  Helpers for room channel
  """
  import Phoenix.View, only: [render_one: 3, render_many: 3, render: 3]

  alias Sling.Web.ChangesetView
  alias Sling.Web.MessageView
  alias Sling.Web.RoomView
  alias Sling.Rooms
  alias Sling.UserRooms
  alias Sling.Messages
  alias Sling.Rooms.Room

  def render_users_and_msg_for_room(room_id) do
    %{
      room: room,
      messages: messages,
      pagination: pagination,
    } = Messages.users_and_msg_for_room(room_id)

    rendered_messages = case messages do
      [] ->
        []
      many_messages ->
        render_many(many_messages, MessageView, "message.json")
    end

    {
      room,
      %{
      messages: rendered_messages,
      room: render_one(room, RoomView, "room.json"),
      pagination: pagination
    }}
  end

  def render_one_message(socket, msg), do: render_one(
    %{msg | user: socket.assigns.current_user},
    MessageView,
    "message.json"
  )

  def render_rooms_list(params) do
    page = Rooms.list_rooms(params)
    render(RoomView, "index.json", page)
  end

  def create_room(id, %{"id" => room_id}) do
    room = Rooms.get_room!(room_id)
    with {:ok, _} <- UserRooms.create_user_room(%{user_id: id, room_id: room.id}) do
      create_room(:ok, :joined, id, room)
    else
      {:error, changeset} ->
          create_room(:respond, :error, changeset)
    end
  end
  def create_room(id, room_params) do
    with {:ok, %Room{} = room} <- Rooms.create_room(room_params),
         {:ok, _}              <- UserRooms.create_user_room(%{
                                    user_id: id,
                                    room_id: room.id}
                                  ) do
      create_room(:ok, :new, id, room)
    else
      {:error, changeset} ->
          create_room(:respond, :error, changeset)
    end
  end
  defp create_room(:ok, status, id, room) do
    {:ok, Map.put(render(RoomView, "show.json", room: room), :meta, %{
      user_id: id,
      status: status,
    })}
  end
  defp create_room(:respond, :error, %Ecto.Changeset{} = changeset) do
    {:error, render(ChangesetView, "error.json", changeset: changeset)}
  end
end
