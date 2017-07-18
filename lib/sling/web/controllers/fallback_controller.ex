defmodule Sling.Web.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use Sling.Web, :controller

  alias Sling.Web.SessionView
  alias Sling.Web.ErrorView

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Sling.Web.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:unauthorized, %Ecto.Changeset{} = _changeset}) do
    conn
    |> put_status(:unauthorized)
    |> render(SessionView, "error.json")
  end

  def call(conn, {:error, :invalid_token}) do
    conn
    |> put_status(:forbidden)
    |> render(SessionView, "forbidden.json", error: "Not Authenticated")
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(Sling.Web.ErrorView, :"404")
  end

  def call(conn, {:error, _}) do
    conn
    |> put_status(:bad_request)
    |> render(ErrorView, "generic.json", error: "Bad Request")
  end
end
