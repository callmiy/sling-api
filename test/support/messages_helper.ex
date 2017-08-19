defmodule Sling.Messages.TestHelper do
  alias Sling.Messages
  alias Sling.Users.TestHelper, as: UserHelper
  alias Sling.Rooms.TestHelper, as: RoomHelper

  def text, do: %{text: "This is a message"}

  def fixture do
    {user, room} = fixture(:user_room)
    {:ok, message} = Messages.create_message(text() |> Enum.into(%{
      user_id: user.id,
      room_id: room.id
      }))
    %{message: message, user: user, room: room}
  end

  def fixture(:user_room), do: {UserHelper.user_fixture(), RoomHelper.fixture()}
end
