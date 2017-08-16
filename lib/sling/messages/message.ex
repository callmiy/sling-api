defmodule Sling.Messages.Message do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset
  alias Sling.Messages.Message
  alias Sling.Users.User
  alias Sling.Rooms.Room

  schema "messages" do
    field :text, :string
    belongs_to :user, User
    belongs_to :room, Room

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:text, :user_id, :room_id])
    |> validate_required([:text, :user_id, :room_id])
  end
end
