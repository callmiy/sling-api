defmodule Sling.RoomsTest do
  use Sling.DataCase

  alias Sling.Rooms
  alias Sling.Rooms.Room
  alias Sling.Rooms.TestHelper, as: Helper

  test "list_rooms/0 returns all rooms" do
    room = Helper.fixture()
    assert %{rooms: [^room]} = Rooms.list_rooms()
  end

  test "get_room!/1 returns the room with given id" do
    room = Helper.fixture()
    assert Rooms.get_room!(room.id) == room
  end

  test "get_room_by/1 when given params exist" do
    room = Helper.fixture()
    assert Rooms.get_room_by(Helper.valid_attrs()) == room
  end

  test "get_room_by/1 when given params does not exist" do
    assert Rooms.get_room_by(name: "does not exists") == nil
  end

  test "create_room/1 with valid data creates a room" do
    valid_attrs = Helper.valid_attrs()
    assert {:ok, %Room{} = room} = Rooms.create_room(valid_attrs)
    assert room.name == valid_attrs.name
    assert room.topic == valid_attrs.topic
  end

  test "create_room/1 with valid data but no topic creates a room" do
    valid_attrs = Map.delete(Helper.valid_attrs(), :topic)
    assert {:ok, %Room{} = room} = Rooms.create_room(valid_attrs)
    assert room.name == valid_attrs.name
    assert room.topic == nil
  end

  test "create_room/1 with invalid data returns error changeset"do
    assert {:error, %Ecto.Changeset{}} = Rooms.create_room(Helper.invalid_attrs)
  end

  test "update_room/2 with valid data updates the room"do
    update_attrs = Helper.update_attrs()
    room = Helper.fixture()
    assert {:ok, room} = Rooms.update_room(room, update_attrs)
    assert %Room{} = room
    assert room.name == update_attrs.name
    assert room.topic == update_attrs.topic
  end

  test "update_room/2 with invalid data returns error changeset" do
    room = Helper.fixture()
    assert {:error, %Ecto.Changeset{}} =
      Rooms.update_room(room, Helper.invalid_attrs())
    assert room == Rooms.get_room!(room.id)
  end

  test "delete_room/1 deletes the room" do
    room = Helper.fixture()
    assert {:ok, %Room{}} = Rooms.delete_room(room)
    assert_raise Ecto.NoResultsError, fn -> Rooms.get_room!(room.id) end
  end

  test "change_room/1 returns a room changeset" do
    room = Helper.fixture()
    assert %Ecto.Changeset{} = Rooms.change_room(room)
  end
end
