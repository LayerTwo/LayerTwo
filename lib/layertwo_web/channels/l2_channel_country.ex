defmodule LayertwoWeb.L2ChannelCountry do
    use LayertwoWeb, :channel

    def join("l2_country:" <> country_uuid, _message, socket) do
        with {:ok, socket} <- LayertwoAuth.ChannelAuth.check_if_country_channel_allowed(country_uuid, socket)
             do
             {:ok, socket}
             else
             {:error, _socket} -> {:error, "Access Denied!"}
             end
      end
    
      def handle_in(_arg, %{}, socket) do
        {:noreply, socket}
      end
      
end