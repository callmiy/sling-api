defmodule Sling.Web.RoomChannelTest do
  use Sling.Web.ChannelCase

  alias Sling.Web.RoomChannel
  alias Sling.Messages
  alias Sling.Rooms
  alias Sling.Users.TestHelper, as: UserHelper
  alias Sling.Rooms.TestHelper, as: RoomHelper
  alias Sling.Messages.TestHelper, as: MessageHelper
  alias Sling.Web.RoomChannel.Helper, as: RoomChannelHelper

  describe "room id" do
    setup do
      user = UserHelper.user_fixture()
      room = RoomHelper.fixture()
      {:ok, _, socket} =
        socket("user_sockets_for:#{user.id}", %{current_user: user})
        |> subscribe_and_join(RoomChannel, "rooms:#{room.id}")

      {:ok, socket: socket}
    end

    test "new_message succeeds and replies with status ok", %{socket: socket} do
      ref = push socket, "new_message", MessageHelper.text()
      assert_reply ref, :ok
    end

    test "new_message fails and replies with status error and changeset", %{socket: socket} do
      ref = push socket, "new_message", %{}
      assert_reply ref, :error, %{errors: _}
    end

    test "message_created broadcasts are pushed to the client", %{socket: socket} do
      user_id = socket.assigns.current_user.id
      {:ok, message} = Messages.create_message(
        socket.assigns.room,
        user_id,
        MessageHelper.text()
      )

      rendered_message = RoomChannelHelper.render_one_message(socket, message)
      message_id = message.id
      text = message.text

      broadcast_from! socket, "message_created", rendered_message
      assert_push "message_created", %{
        id: ^message_id,
        text: ^text,
        user: %{id: ^user_id},
      }
    end
  end

  describe "rooms utils" do
    setup do
      user = UserHelper.user_fixture()
      {:ok, _, socket} =
        socket("user_sockets_for:#{user.id}", %{current_user: user})
        |> subscribe_and_join(RoomChannel, "rooms:utils")

      {:ok, socket: socket}
    end

    test "'load rooms' succeeds and replies with status ok and requested rooms", %{socket: socket} do
      room = RoomHelper.fixture()
      room_id = room.id
      ref = push socket, "load rooms", %{}
      assert_reply ref, :ok, %{
        data: [%{id: ^room_id}],
        pagination: %{total_entries: 1}
      }
    end

    test "'new room' creates new room and new user room, replies with status ok and created room id, and broadcasts created room", %{socket: socket} do
      attrs = RoomHelper.valid_attrs()
      ref = push socket, "new room", attrs
      task = Task.async(fn ->
        room = Rooms.get_room_by(attrs)
        room.id
      end)
      room_id = Task.await(task)
      assert_reply ref, :ok, %{room_id: ^room_id}
      user_id = socket.assigns.current_user.id
      name = attrs.name
      topic = attrs.topic
      assert_push "room created", %{
        data: %{name: ^name, topic: ^topic},
        meta: %{ user_id: ^user_id, status: :new }
      }
    end

    test "'new room' gets existing room and creates new user room, replies with status ok and fetched room id, and broadcasts fetched room", %{socket: socket} do
      room = RoomHelper.fixture()
      room_id = room.id
      ref = push socket, "new room", %{"id" => room_id}
      assert_reply ref, :ok, %{room_id: ^room_id}
      user_id = socket.assigns.current_user.id
      assert_push "room created", %{data: %{}, meta: %{
        user_id: ^user_id, status: :joined,
      }}
    end

    test "'new room' fails and replies with status error and changeset", %{socket: socket} do
      ref = push socket, "new room", RoomHelper.invalid_attrs()
      assert_reply ref, :error, %{errors: _}
    end
  end
end
