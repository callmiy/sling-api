defmodule Sling.UsersTest do
  use Sling.DataCase

  alias Sling.Users

  describe "users" do
    alias Sling.Users.User
    alias Sling.Users.TestHelper, as: UserHelper

    setup do
      {:ok,
        valid_attrs: UserHelper.get_valid_attrs(),
        update_attrs: UserHelper.get_update_attrs(),
        invalid_attrs: UserHelper.get_invalid_attrs()
      }
    end

    test "list_users/0 returns all users" do
      user = UserHelper.user_fixture()
      assert Users.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = UserHelper.user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "get_user_by/1 returns the user with given params", %{valid_attrs: valid_attrs} do
      user = UserHelper.user_fixture()
      assert Users.get_user_by(username: valid_attrs.username) == user
    end

    test "create_user/1 with valid data creates a user", %{valid_attrs: valid_attrs} do
      assert {:ok, %User{} = user} = Users.create_user(valid_attrs)
      assert user.email == valid_attrs.email
      assert Users.confirm_password(valid_attrs, user) == true
      assert user.username == valid_attrs.username
    end

    test "create_user/1 with invalid data returns error changeset", %{invalid_attrs: invalid_attrs} do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(invalid_attrs)
    end

    test "update_user/2 with valid data updates the user", %{update_attrs: update_attrs} do
      user = UserHelper.user_fixture()
      assert {:ok, user} = Users.update_user(user, update_attrs)
      assert %User{} = user
      assert user.email == update_attrs.email
      assert Users.confirm_password(update_attrs, user) == true
      assert user.username == update_attrs.username
    end

    test "update_user/2 with invalid data returns error changeset", %{invalid_attrs: invalid_attrs} do
      user = UserHelper.user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = UserHelper.user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = UserHelper.user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end

    test "authenticate/2 returns authenticated user", %{valid_attrs: valid_attrs} do
      user = UserHelper.user_fixture()
      auth_params = Map.delete(valid_attrs, :email)
      assert Users.authenticate(auth_params) == {:ok, user}

      auth_params = Map.delete(valid_attrs, :username)
      assert Users.authenticate(auth_params) == {:ok, user}
    end

    test "authenticate/2 fails authentication", %{valid_attrs: valid_attrs} do
      _user = UserHelper.user_fixture()
      auth_params = %{valid_attrs | password: "invalid_password"}
      assert Users.authenticate(auth_params) == {:unauthorized, Users.change_user(auth_params)}
    end
  end
end
