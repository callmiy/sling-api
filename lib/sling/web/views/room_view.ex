defmodule Sling.Web.RoomView do
  use Sling.Web, :view
  alias Sling.Web.RoomView

  def render("index.json", %{rooms: rooms, pagination: pagination}) do
    %{
      data: render_many(rooms, RoomView, "room.json"),
      pagination: pagination,
     }
  end

  def render("show.json", %{room: room}) do
    %{data: render_one(room, RoomView, "room.json")}
  end

  def render("room.json", %{room: room}) do
    %{id: room.id,
      name: room.name,
      topic: room.topic}
  end
end
