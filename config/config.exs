# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :sling,
  ecto_repos: [Sling.Repo]

# Configures the endpoint
config :sling, Sling.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "EC+lfyne9DfQbCGz89x3uDtJ3adloXzxKPNWYz4kQ7DPt8kcXwIraRU6+AUnjcO4",
  render_errors: [view: Sling.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Sling.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
    allowed_algos: ["HS512"], # optional
    verify_module: Guardian.JWT,  # optional
    issuer: "MyApp",
    ttl: { 30, :days },
    allowed_drift: 2000,
    verify_issuer: true, # optional
    secret_key: "eWWUSD0b56cZsAkorvj/GLMVrFnDfbCybJNHFGt5i9H3wX+rcMzHsk+MjBpSjvB9",
    serializer: Sling.Users.UserSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
