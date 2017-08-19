ExUnit.configure(exclude: [norun: true])

ExUnit.start()

Ecto.Adapters.SQL.Sandbox.mode(Sling.Repo, :manual)
