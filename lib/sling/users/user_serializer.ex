defmodule Sling.Users.UserSerializer do
  @moduledoc false

  @behaviour Guardian.Serializer

  alias Sling.Users
  alias Sling.Users.User

  def for_token(%User{} = user), do: {:ok, "User:" <> user.username}
  def for_token(_), do: {:error, "Unknown resource type"}
  def from_token("User:" <> username), do: {
    :ok, Users.get_user_by(username: username)
  }
  def from_token(_), do: {:error, "Unknown resource type"}
end
