defmodule Sling.Rooms.TestHelper do
  alias Sling.Rooms

  def valid_attrs, do: %{
    name: "Elixir",
    topic: "Elixir help wanted"
  }

  def update_attrs, do: %{
    name: "Elixir Updated",
    topic: "Elixir help wanted updated"
  }

  def invalid_attrs, do: %{
    name: nil,
    topic: nil
  }

  def fixture(attrs \\ %{}) do
    {:ok, room} =
      attrs
      |> Enum.into(valid_attrs())
      |> Rooms.create_room()
    room
  end

  def verify_json_response(response, creator_attrs) do
    Enum.all?(response, fn {k, v} ->
      Map.get(creator_attrs, String.to_existing_atom(k)) == v
    end)
  end
end
