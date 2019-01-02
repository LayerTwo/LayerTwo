defmodule LayertwoWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :layertwo

  socket "/socket", LayertwoWeb.L2Websocket,
    websocket: [max_frame_size: 2000],
    longpoll: false

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/",
    from: :layertwo,
    gzip: false,
    only: ~w(css images uploads js favicon.ico robots.txt)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: System.get_env("LAYERTWO_SESSION_SALT"),
    signing_salt: System.get_env("LAYERTWO_SESSION_COOKIE_ENCRYPT_SALT")

  plug LayertwoWeb.Router
end
