defmodule Sling.Users.TestHelper do
  alias Sling.Users

  def get_valid_attrs, do: %{
    email: "some@email.com",
    password: "password",
    username: "test_username"
  }

  def get_update_attrs, do: %{
    email: "some_update@email.com",
    password: "password_update",
    username: "test_update_username"
  }

  def get_invalid_attrs, do: %{
    email: nil,
    password_hash: nil,
    username: nil
  }

  def nil_password(user), do: %{user | password: nil}

  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(get_valid_attrs())
      |> Users.create_user()
    nil_password(user)
  end

  def verify_json_response(response, creator_attrs) do
    Enum.all?(response, fn {k, v} ->
      Map.get(creator_attrs, String.to_existing_atom(k)) == v
    end)
  end
end
