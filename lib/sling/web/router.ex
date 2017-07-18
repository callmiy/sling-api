defmodule Sling.Web.Router do
  use Sling.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  pipeline :api_auth do
    plug :accepts, ["json"]
    plug Guardian.Plug.EnsureAuthenticated, handler: Sling.Web.SessionController
  end

  scope "/", Sling.Web do
    pipe_through :browser # Use the default browser stack
    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", Sling.Web do
    pipe_through :api
    resources "/users", UserController, only: [:create]
    post "/sessions/login", SessionController, :login
    delete "/sessions/logout", SessionController, :logout
  end

  scope "/api", Sling.Web do
    pipe_through [:api, :api_auth]
    get "/sessions/refresh", SessionController, :refresh
    resources "/rooms", RoomController, except: [:new, :edit]
    get "/users/:id/rooms", UserController, :rooms
  end
end
