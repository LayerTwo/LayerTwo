defmodule LayerTwoDb.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Starts a worker by calling: LayerTwoDb.Worker.start_link(arg)
      # {LayerTwoDb.Worker, arg},
    ]
    bolt_opts = Application.get_env(:bolt_sips, Bolt)
    Bolt.Sips.start_link(bolt_opts)
    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: LayerTwoDb.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
