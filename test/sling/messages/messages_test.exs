defmodule Sling.MessagesTest do
  use Sling.DataCase

  alias Sling.Messages
  alias Sling.Messages.TestHelper, as: Helper
  alias Sling.Rooms.Room
  alias Sling.Messages.Message

  test "list_messages/0 returns all messages" do
    %{message: message} = Helper.fixture()
    assert Messages.list_messages() == [message]
  end

  test "users_and_msg_for_room/1 returns the room with all users and messages they have created in the room" do
    %{room: room, message: message, user: user} = Helper.fixture()
    room_id = room.id
    message_id = message.id

    assert %{
      room: %Room{id: ^room_id},
      messages: [%Message{
        id: ^message_id,
        user: ^user
        }],
      pagination: %{total_entries: 1}
    } = Messages.users_and_msg_for_room(room.id)
  end

  test "users_and_msg_for_room/1 returns only the room when no messages have been created in the room" do
    {_user, room} = Helper.fixture(:user_room)

    assert %{
      room: ^room,
      messages: [],
      pagination: %{total_entries: 0}
    } = Messages.users_and_msg_for_room(room.id)
  end

  test "creates message given a room struct and user id" do
    {user, room} = Helper.fixture(:user_room)
    assert {:ok, %Message{}} = Messages.create_message room, user.id, Helper.text()
  end
end
