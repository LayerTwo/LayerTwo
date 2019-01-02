defmodule LayertwoWeb.L2Websocket do
  use Phoenix.Socket

  ## Channels
  channel "l2_init:*", LayertwoWeb.L2ChannelInit

  channel "l2_personal:*", LayertwoWeb.L2ChannelPersonal

  channel "l2_social:*", LayertwoWeb.L2ChannelSocial

  channel "l2_city_local:*", LayertwoWeb.L2ChannelCityLocal

  channel "l2_city:*", LayertwoWeb.L2ChannelCity

  channel "l2_country:*", LayertwoWeb.L2ChannelCountry

  channel "l2_world:*", LayertwoWeb.L2ChannelWorld

  channel "l2_space:*", LayertwoWeb.L2ChannelSpace

  channel "l2_visit:*", LayertwoWeb.L2ChannelVisit

  
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(%{"entity_token" => entity_token}, socket) do
    case Phoenix.Token.verify(socket, System.get_env("LAYERTWO_TOKEN_SALT"), entity_token, max_age: 1209600) do
    {:ok, entity_uuid} -> socket = assign(socket, "entity_uuid", entity_uuid)
                          {:ok, socket}
    {:error, _} -> :error
  end
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     LayertwoWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
