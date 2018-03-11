# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :layertwo, LayertwoWeb.Endpoint,
  url: [host: "layertwo.heroku.com"],
  secret_key_base: System.get_env("layertwo_secret_key_base"),
  render_errors: [view: LayertwoWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Layertwo.PubSub,
           adapter: Phoenix.PubSub.PG2]


config :bolt_sips, Bolt,
  hostname: 'localhost',
  basic_auth: [username: "neo4j", password: System.get_env("layertwo_neo4j_pass")],
  port: 7687,
  pool_size: 5,
  max_overflow: 1

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
