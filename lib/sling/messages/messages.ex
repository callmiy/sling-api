defmodule Sling.Messages do
  @moduledoc """
  The boundary for the Messages system.
  """

  import Ecto.Query, warn: false

  alias Sling.Repo
  alias Sling.Messages.Message
  alias Sling.Pagination
  alias Sling.Rooms
  alias Sling.Rooms.Room

  @doc """
  Returns the list of messages.

  ## Examples

      iex> list_messages()
      [%Message{}, ...]

  """
  def list_messages do
    Repo.all(Message)
  end

  @doc """
  Given a room id, returns that room, all messages created in the room and the
  users who have created the messages
  """
  def users_and_msg_for_room(room_id) do
    page = Repo.paginate from messages in Message,
      join: room in assoc(messages, :room),
      where: room.id == ^room_id,
      join: users in assoc(messages, :user),
      order_by: [desc: messages.inserted_at, desc: messages.id],
      preload: [room: room, user: users]

    {room, messages} = case page.entries do
      [] ->
        {Rooms.get_room!(room_id), []}
      entries ->
        {
          List.first(entries).room,
          Enum.map(entries, fn(m) -> %{m | room: nil} end)
        }
    end

    %{
      room: room,
      messages: messages,
      pagination: Pagination.paginate(page),
    }
  end

  @doc """
  Gets a single message.

  Raises `Ecto.NoResultsError` if the Message does not exist.

  ## Examples

      iex> get_message!(123)
      %Message{}

      iex> get_message!(456)
      ** (Ecto.NoResultsError)

  """
  def get_message!(id), do: Repo.get!(Message, id)

  @doc """
  Creates a message.

  ## Examples

      iex> create_message(%{field: value})
      {:ok, %Message{}}

      iex> create_message(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_message(attrs \\ %{}) do
    %Message{}
    |> Message.changeset(attrs)
    |> Repo.insert()
  end
  def create_message(%Room{} = room, user_id, attrs \\ %{}) do
    room
    |> Ecto.build_assoc(:messages, user_id: user_id)
    |> Message.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a message.

  ## Examples

      iex> update_message(message, %{field: new_value})
      {:ok, %Message{}}

      iex> update_message(message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_message(%Message{} = message, attrs) do
    message
    |> Message.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Message.

  ## Examples

      iex> delete_message(message)
      {:ok, %Message{}}

      iex> delete_message(message)
      {:error, %Ecto.Changeset{}}

  """
  def delete_message(%Message{} = message) do
    Repo.delete(message)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking message changes.

  ## Examples

      iex> change_message(message)
      %Ecto.Changeset{source: %Message{}}

  """
  def change_message(%Message{} = message) do
    Message.changeset(message, %{})
  end
end
