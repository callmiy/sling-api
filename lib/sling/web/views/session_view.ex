defmodule Sling.Web.SessionView do
  use Sling.Web, :view
  alias Sling.Web.SessionView
  alias Sling.Web.UserView

  def render("show.json", %{session: session}) do
    %{data: render_one(session, SessionView, "session.json")}
  end

  def render("session.json", %{user: user, jwt: jwt}) do
    %{
      data: render_one(user, UserView, "user.json"),
      meta: %{token: jwt}
    }
  end

  def render("error.json", _), do: %{errors: "Invalid email/username or password"}

  def render("forbidden.json", %{error: error}), do: %{errors: error}

  def render("logout.json", _), do: %{data: true}
end
