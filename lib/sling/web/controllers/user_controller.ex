defmodule Sling.Web.UserController do
  use Sling.Web, :controller

  alias Sling.Users
  alias Sling.Users.User
  alias Sling.Web.SessionController
  alias Sling.UserRooms
  alias Sling.Web.UserRoomView

  action_fallback Sling.Web.FallbackController

  def create(conn, user_params) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      SessionController.authenticate_user conn, user
    end
  end

  def rooms(conn, %{"id" => id}) do
    render(
      conn,
      UserRoomView,
      "list_rooms_for_user.json",
      UserRooms.list_rooms_for_user(id)
    )
  end
end
