ExUnit.configure(exclude: [norun: true])

ExUnit.start()

Ecto.Adapters.SQL.Sandbox.mode(Sling.Repo, :manual)

Code.require_file("messages_helper.exs", __DIR__)
Code.require_file("users_helper.exs", __DIR__)
Code.require_file("rooms_helper.exs", __DIR__)
Code.require_file("user_rooms_helper.exs", __DIR__)
Code.require_file("conn_helper.exs", __DIR__)
