defmodule Sling.Users do
  @moduledoc """
  The boundary for the Users system.
  """

  import Ecto.Query, warn: false
  import Comeonin.Bcrypt, only: [{:dummy_checkpw, 0}, {:checkpw, 2}]
  import Phoenix.View, only: [render_one: 3]

  alias Sling.Repo
  alias Sling.Users.User
  alias Sling.Web.UserView

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by(params), do: Repo.get_by(User, params)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.update_changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end
  def change_user(%{} = params), do: User.changeset(%User{}, params)
  def change_user(params), do: User.changeset(%User{}, params)

  def render_user(%User{} = user), do: render_one(user, UserView, "user.json")

  def authenticate(auth_params) do
    auth_params
    |> get_auth_field()
    |> get_user_by()
    |> case  do
      nil ->
        dummy_checkpw()
        {:unauthorized, change_user(auth_params)}
      user ->
        if confirm_password(auth_params, user) do
          {:ok, user}
        else
          {:unauthorized, change_user(auth_params)}
        end
    end
  end

  def confirm_password(%{password: password}, user), do: confirm_password(password, user)
  def confirm_password(%{"password" => password}, user), do: confirm_password(password, user)
  def confirm_password(password, user), do: checkpw(password, user.password_hash)

  defp get_auth_field(%{username: username}), do: [username: username]
  defp get_auth_field(%{"username" => username}), do: [username: username]
  defp get_auth_field(%{email: email}), do: [email: email]
  defp get_auth_field(%{"email" => email}), do: [email: email]
end
