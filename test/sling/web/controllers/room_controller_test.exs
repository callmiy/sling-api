defmodule Sling.Web.RoomControllerTest do
  use Sling.Web.ConnCase
  require Sling.Web.ConnHelper

  alias Sling.Rooms.Room
  alias Sling.Rooms.TestHelper, as: Helper
  alias Sling.Web.ConnHelper

  setup %{conn: conn} do
    %{conn: conn} = ConnHelper.create_and_login_user(conn)
    {:ok, conn: conn }
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, room_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates room and renders room when data is valid", %{conn: conn} do
    create_attrs = Helper.valid_attrs()
    post_conn = post conn, room_path(conn, :create), create_attrs
    assert %{"id" => id} = json_response(post_conn, 201)["data"]

    conn = get conn, room_path(conn, :show, id)
    assert Helper.verify_json_response(json_response(conn, 200)["data"], Map.put(create_attrs, :id, id))
  end

  test "creates user room and renders room when room id and data is valid", %{conn: conn} do
    %{id: id} = Helper.fixture()
    post_conn = post conn, room_path(conn, :create), %{id: id}
    assert %{"id" => ^id} = json_response(post_conn, 201)["data"]
  end

  test "does not create room and renders errors when data is invalid", %{conn: conn} do

    post_conn = post conn, room_path(conn, :create), Helper.invalid_attrs()
    assert json_response(post_conn, 422)["errors"] != %{}
  end

  test "updates chosen room and renders room when data is valid", %{conn: conn} do
    update_attrs = Helper.update_attrs()
    %Room{id: id} = room = Helper.fixture()
    post_conn = put conn, room_path(conn, :update, room), room: update_attrs
    assert %{"id" => ^id} = json_response(post_conn, 200)["data"]

    get_conn = get conn, room_path(conn, :show, id)
    assert Helper.verify_json_response(
          json_response(get_conn, 200)["data"],
          Map.put(update_attrs, :id, id)
        )
  end

  test "does not update chosen room and renders errors when data is invalid", %{conn: conn} do
    room = Helper.fixture()
    conn = put conn, room_path(conn, :update, room), room: Helper.invalid_attrs()
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen room", %{conn: conn} do
    room = Helper.fixture()
    delete_conn = delete conn, room_path(conn, :delete, room)
    assert response(delete_conn, 204)
    assert_error_sent 404, fn ->
      get conn, room_path(conn, :show, room)
    end
  end
end
