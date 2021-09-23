defmodule Layertwo.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    import Supervisor.Spec
    children = [
      worker(Bolt.Sips, [Application.get_env(:bolt_sips, Bolt)]),
      # Start the Telemetry supervisor
      LayertwoWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Layertwo.PubSub},
      # Start the Endpoint (http/https)
      LayertwoWeb.Endpoint
      # Start a worker by calling: Layertwo.Worker.start_link(arg)
      # {Layertwo.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Layertwo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    LayertwoWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
