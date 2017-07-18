defmodule Sling.Users.User do
  use Ecto.Schema

  import Ecto.Changeset
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]

  alias Sling.Users.User
  alias Sling.Rooms.Room
  alias Sling.Messages.Message


  schema "users" do
    field :email, :string
    field :password_hash, :string
    field :username, :string
    field :password, :string, virtual: true
    many_to_many :rooms, Room, join_through: "user_rooms"
    has_many :messages, Message

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:username, :email, :password_hash])
    |> validate_required([:username, :email])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def update_changeset(%User{} = user, %{password: _password} = params) do
    registration_changeset(user, params)
  end

  def update_changeset(%User{} = user, %{"password" => _password} = params) do
    registration_changeset(user, params)
  end

  def update_changeset(user, params), do: changeset(user, params)

  def registration_changeset(%User{} = user, params \\ %{}) do
    user
    |>changeset(params)
    |> cast(params, [:password])
    |> validate_required([:password])
    |> hashpw()
  end

  defp hashpw(%Ecto.Changeset{valid?: true} = changes) do
    put_change(changes, :password_hash, hashpwsalt(changes.changes.password))
  end

  defp hashpw(changes), do: changes
end
