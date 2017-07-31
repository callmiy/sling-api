defmodule Sling.Web.SessionControllerTest do
  use Sling.Web.ConnCase
  require Sling.Web.ConnHelper

  alias Sling.Users.TestHelper, as: Helper
  alias Sling.Web.ConnHelper

  setup %{conn: conn} do
    {:ok,
     conn: put_req_header(conn, "accept", "application/json"),
     valid_params: Helper.get_valid_attrs(),
     user: Helper.user_fixture()
    }
  end

  test "user login with valid credentials succeeds",
      %{conn: conn, valid_params: valid_params, user: user} do
    %{conn: conn} = ConnHelper.login_user conn, valid_params
    %{"data" => data, "meta" => %{"token" => _token}} = json_response(conn, 201)
    assert Helper.verify_json_response(data, Map.from_struct(user)) == true

    authenticated_user = Guardian.Plug.current_resource(conn)
    assert user == authenticated_user
  end

  test "user login with invalid credentials fails",
      %{conn: conn, valid_params: valid_params} do
    %{conn: conn} = ConnHelper.login_user(
      conn, %{valid_params | password: "invalid_password"}
    )
    assert json_response(conn, 401)["errors"] != %{} #errors must not be empty
  end

  test "user refresh with valid credentials succeeds",
      %{conn: conn, user: user, valid_params: valid_params} do
    %{jwt: jwt} = ConnHelper.login_user conn, valid_params
    conn = ConnHelper.put_token_in_request_header conn, jwt
    conn = get conn, session_path(conn, :refresh)
    %{"data" => data, "meta" => %{"token" => _}} = json_response(conn, 200)
    assert Helper.verify_json_response(data, Map.from_struct(user))
  end

  test "user refreshes with invalid credentials fails",
      %{conn: conn, valid_params: valid_params} do
    %{jwt: jwt} = ConnHelper.login_user conn, valid_params
    invalid_jwt = jwt <> "1"
    conn = ConnHelper.put_token_in_request_header conn, invalid_jwt
    conn = get conn, session_path(conn, :refresh)
    assert json_response(conn, 401)["errors"] != %{}
  end

  test "user refreshes with bad token fails", %{conn: conn} do
    conn = ConnHelper.put_token_in_request_header conn, ""
    conn = get conn, session_path(conn, :refresh)
    assert json_response(conn, 401)["errors"] != %{}
  end

  test "user logout successful", %{conn: conn, valid_params: valid_params} do
    %{jwt: jwt} = ConnHelper.login_user conn, valid_params
    conn = ConnHelper.put_token_in_request_header conn, jwt
    conn = delete conn, session_path(conn, :logout)
    assert json_response(conn, 200)["data"] == true
  end
end
