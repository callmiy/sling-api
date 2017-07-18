defmodule Sling.UserRooms.TestHelper do
  alias Sling.Users.TestHelper, as: UserHelper
  alias Sling.Rooms.TestHelper, as: RoomHelper
  alias Sling.UserRooms

  def fixture do
    user = UserHelper.user_fixture()
    room = RoomHelper.fixture()
    {:ok, user_room} = UserRooms.create_user_room(%{
      user_id: user.id,
      room_id: room.id
      })
    %{user_room: user_room, user: user, room: room}
  end
end
