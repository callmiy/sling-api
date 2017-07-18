defmodule Sling.Web.ConnHelper do
  alias Sling.Users.TestHelper, as: UserHelper
  alias Sling.Web.ConnHelper

  defmacro login_user(conn, params) do
    quote do
      conn = unquote(conn)
      conn = post conn, session_path(conn, :login), unquote(params)
      jwt = Guardian.Plug.current_token(conn)
      %{conn: conn, jwt: jwt}
    end
  end

  defmacro put_token_in_request_header(conn, jwt) do
    quote do
      put_req_header(unquote(conn), "authorization", "Bearer: " <> unquote(jwt))
    end
  end

  defmacro create_and_login_user(conn) do
    quote do
      user = UserHelper.user_fixture()
      conn = unquote(conn)
      %{jwt: jwt} = ConnHelper.login_user(conn, UserHelper.get_valid_attrs())
      conn = conn
      |> ConnHelper.put_token_in_request_header(jwt)
      |> put_req_header("accept", "application/json")
      %{conn: conn, user: user}
    end
  end
end
