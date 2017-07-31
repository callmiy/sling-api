defmodule Sling.UserRoomsTest do
  use Sling.DataCase

  alias Sling.UserRooms
  alias Sling.Rooms.UserRoom
  alias Sling.UserRooms.TestHelper, as: Helper

  test "list_users_for_room/1 returns users of a given room" do
    %{user: user, room: room} = Helper.fixture()
    assert %{
      users: [^user],
      pagination: %{total_entries: 1}
      } = UserRooms.list_users_for_room(room.id)
  end

  test "list_rooms_for_user/1 returns rooms a user has joined" do
    %{user: user, room: room} = Helper.fixture()
    assert %{
      rooms: [^room],
      pagination: %{total_entries: 1}
      } = UserRooms.list_rooms_for_user(user.id)
  end

  test "get_user_room!/1 returns the user_room with given id" do
    %{user_room: user_room} = Helper.fixture()
    assert UserRooms.get_user_room!(user_room.id) == user_room
  end

  # test "create_user_room/1 with invalid data returns error changeset" do
  #   assert {:error, %Ecto.Changeset{}} =
        # UserRooms.create_user_room(@invalid_attrs)
  # end

  test "delete_user_room/1 deletes the user_room" do
    %{user_room: user_room} = Helper.fixture()
    assert {:ok, %UserRoom{}} = UserRooms.delete_user_room(user_room)
    assert_raise Ecto.NoResultsError, fn ->
      UserRooms.get_user_room!(user_room.id)
    end
  end

  test "change_user_room/1 returns a user_room changeset" do
    %{user_room: user_room} = Helper.fixture()
    assert %Ecto.Changeset{} = UserRooms.change_user_room(user_room)
  end
end
