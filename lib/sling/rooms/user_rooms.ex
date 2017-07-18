defmodule Sling.UserRooms do
  @moduledoc """
  The boundary for the UserRooms system.
  """

  import Ecto.Query, warn: false

  alias Sling.Repo
  alias Sling.Rooms.{UserRoom, Room}
  alias Sling.Users.User
  alias Sling.Pagination

  @doc """
  Given a room id, returns the room and a list of users of the room.

  ## Examples

      iex> list_users_for_room(id)
      %Room{..., users: [%User{}, ...]}

  """
  def list_users_for_room(room_id) do
    page = Repo.paginate from users in User,
      join: room in assoc(users, :rooms),
      where: room.id == ^room_id

    %{
      users: page.entries,
      pagination: Pagination.paginate(page)
    }
  end

  @doc """
  Given a user id, returns the user and a list of rooms joined by the user.

  ## Examples

      iex> list_rooms_for_user(id)
      %User{..., rooms: [%Room{}, ...]}

  """
  def list_rooms_for_user(user_id) do
    page = Repo.paginate from rooms in Room,
      join: user in assoc(rooms, :users),
      where: user.id == ^user_id,
      order_by: [asc: rooms.id]

    %{
      rooms: page.entries,
      pagination: Pagination.paginate(page)
    }
  end

  @doc """
  Gets a single user_room.

  Raises `Ecto.NoResultsError` if the User room does not exist.

  ## Examples

      iex> get_user_room!(123)
      %UserRoom{}

      iex> get_user_room!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user_room!(id), do: Repo.get!(UserRoom, id)

  @doc """
  Creates a user_room.

  ## Examples

      iex> create_user_room(%{field: value})
      {:ok, %UserRoom{}}

      iex> create_user_room(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user_room(attrs \\ %{}) do
    %UserRoom{}
    |> UserRoom.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user_room.

  ## Examples

      iex> update_user_room(user_room, %{field: new_value})
      {:ok, %UserRoom{}}

      iex> update_user_room(user_room, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user_room(%UserRoom{} = user_room, attrs) do
    user_room
    |> UserRoom.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a UserRoom.

  ## Examples

      iex> delete_user_room(user_room)
      {:ok, %UserRoom{}}

      iex> delete_user_room(user_room)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user_room(%UserRoom{} = user_room) do
    Repo.delete(user_room)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user_room changes.

  ## Examples

      iex> change_user_room(user_room)
      %Ecto.Changeset{source: %UserRoom{}}

  """
  def change_user_room(%UserRoom{} = user_room) do
    UserRoom.changeset(user_room, %{})
  end
end
