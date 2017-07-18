defmodule Sling.Web.RoomController do
  use Sling.Web, :controller

  alias Sling.Rooms
  alias Sling.Rooms.Room
  alias Sling.UserRooms

  action_fallback Sling.Web.FallbackController

  def index(conn, params) do
    page = Rooms.list_rooms(params)
    render(conn, "index.json", page)
  end

  def create(conn, %{"id" => room_id}) do
    user = Guardian.Plug.current_resource(conn)
    room = Rooms.get_room!(room_id)
    with {:ok, _} <- UserRooms.create_user_room(%{user_id: user.id, room_id: room.id}) do
      conn
      |> put_status(:created)
      |> render("show.json", room: room)
    end
  end
  def create(conn, room_params) do
    user = Guardian.Plug.current_resource(conn)
    with {:ok, %Room{} = room} <- Rooms.create_room(room_params),
         {:ok, _} <- UserRooms.create_user_room(%{user_id: user.id, room_id: room.id}) do
      conn
      |> put_status(:created)
      |> render("show.json", room: room)
    end
  end

  def show(conn, %{"id" => id}) do
    room = Rooms.get_room!(id)
    render(conn, "show.json", room: room)
  end

  def update(conn, %{"id" => id, "room" => room_params}) do
    room = Rooms.get_room!(id)

    with {:ok, %Room{} = room} <- Rooms.update_room(room, room_params) do
      render(conn, "show.json", room: room)
    end
  end

  def delete(conn, %{"id" => id}) do
    room = Rooms.get_room!(id)
    with {:ok, %Room{}} <- Rooms.delete_room(room) do
      send_resp(conn, :no_content, "")
    end
  end
end
