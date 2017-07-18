defmodule Sling.Web.UserRoomView do
  use Sling.Web, :view
  alias Sling.Web.UserRoomView
  alias Sling.Web.RoomView

  def render("index.json", %{user_rooms: user_rooms}) do
    %{data: render_many(user_rooms, UserRoomView, "user_room.json")}
  end

  def render("show.json", %{user_room: user_room}) do
    %{data: render_one(user_room, UserRoomView, "user_room.json")}
  end

  def render("user_room.json", %{user_room: user_room}) do
    %{id: user_room.id}
  end

  def render("list_rooms_for_user.json", %{rooms: [], pagination: pagination}) do
    %{data: [], pagination: pagination}
  end

  def render("list_rooms_for_user.json", %{rooms: rooms, pagination: pagination}) do
    %{
      data: render_many(rooms, RoomView, "room.json"),
      pagination: pagination,
    }
  end
end
