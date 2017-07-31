defmodule Sling.Web.UserControllerTest do
  use Sling.Web.ConnCase
  require Sling.Web.ConnHelper

  alias Sling.Web.ConnHelper
  alias Sling.Users.TestHelper, as: UserHelper
  alias Sling.UserRooms.TestHelper, as: UserRoomsHelper
  alias Sling.Rooms.TestHelper, as: RoomHelper

  def fixture(:user) do
    UserHelper.user_fixture()
  end

  setup %{conn: conn} do
    {:ok,
    create_attrs: UserHelper.get_valid_attrs(),
    invalid_attrs: UserHelper.get_invalid_attrs(),
     conn: put_req_header( conn, "accept", "application/json" )
    }
  end

  test "creates user and renders user when data is valid",
      %{conn: conn, create_attrs: create_attrs} do
    conn = post conn, user_path(conn, :create), create_attrs
    assert %{"id" => _id} = json_response(conn, 201)["data"]
  end

  test "does not create user and renders errors when data is invalid",
      %{conn: conn, invalid_attrs: invalid_attrs} do
    conn = post conn, user_path(conn, :create), invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "gets user rooms when rooms with user exists",
      %{conn: conn, create_attrs: create_attrs} do
    %{user: user, room: room} = UserRoomsHelper.fixture()
    %{jwt: jwt} = ConnHelper.login_user(conn, create_attrs)
    logged_in_conn = conn
    |> ConnHelper.put_token_in_request_header(jwt)
    get_conn = get logged_in_conn, user_path(conn, :rooms, user)

    [rendered_room] = json_response(get_conn, 200)["data"]
    assert RoomHelper.verify_json_response(
      rendered_room,
      Map.put(RoomHelper.valid_attrs(), :id, room.id)
    )
  end

  test "gets user rooms when user exists without room", %{conn: conn} do
    %{conn: logged_in_conn, user: user} = conn
    |> ConnHelper.create_and_login_user()
    get_conn = get logged_in_conn, user_path(conn, :rooms, user)
    assert json_response(get_conn, 200)["data"] == []
  end
end
