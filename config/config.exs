# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :layertwo, LayertwoWeb.Endpoint,
  url: [host: System.get_env("HOST_NAME")],
  secret_key_base: System.get_env("LAYERTWO_SECRET_KEY_BASE"),
  render_errors: [view: LayertwoWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Layertwo.PubSub, adapter: Phoenix.PubSub.PG2]


config :bolt_sips, Bolt,
  url: System.get_env("NEO4J_BOLT_URL"),
  basic_auth: [username: System.get_env("NEO4J_BOLT_USER"), password: System.get_env("NEO4J_BOLT_PASSWORD")],
  ssl: true


# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
