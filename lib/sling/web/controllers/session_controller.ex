defmodule Sling.Web.SessionController do
  use Sling.Web, :controller

  alias Sling.Users
  alias Sling.Web.SessionView

  action_fallback Sling.Web.FallbackController

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:unauthorized)
    |> render(SessionView, "error.json")
  end

  def login(conn, params) do
    with {:ok, user} <- Users.authenticate(params) do
      authenticate_user conn, user
    end
  end

  def authenticate_user(conn, user) do
    new_conn = Guardian.Plug.api_sign_in(conn, user)
    jwt = Guardian.Plug.current_token(new_conn)
    new_conn
    |> put_status(:created)
    |> render(SessionView, "session.json", user: user, jwt: jwt)
  end

  def refresh(conn, _params) do
    with {:ok, claims} <- Guardian.Plug.claims(conn) do
      user = Guardian.Plug.current_resource(conn)
      jwt = Guardian.Plug.current_token(conn)

      with {:ok, new_jwt, _} <- Guardian.refresh!(jwt, claims) do
        conn
        |> put_status(:ok)
        |> render("session.json", user: user, jwt: new_jwt)
      end
    end
  end

  def logout(conn, _) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke!(jwt)
    conn
    |> put_status(:ok)
    |> render("logout.json")
  end
end
