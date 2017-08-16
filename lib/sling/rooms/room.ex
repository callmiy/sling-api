defmodule Sling.Rooms.Room do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset
  alias Sling.Rooms.Room
  alias Sling.Users.User
  alias Sling.Messages.Message

  schema "rooms" do
    field :name, :string
    field :topic, :string
    many_to_many :users, User, join_through: "user_rooms"
    has_many :messages, Message

    timestamps()
  end

  @doc false
  def changeset(%Room{} = room, attrs) do
    room
    |> cast(attrs, [:name, :topic])
    |> validate_required([:name])
    |> validate_length(:name, min: 3)
    |> unique_constraint(:name)
  end
end
