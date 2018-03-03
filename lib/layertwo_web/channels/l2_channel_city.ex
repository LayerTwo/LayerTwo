defmodule LayertwoWeb.L2ChannelCity do
    use LayertwoWeb, :channel

    def join("l2_city:" <> city_uuid, _message, socket) do
        with {:ok, socket} <- LayertwoAuth.ChannelAuth.check_if_city_channel_allowed(city_uuid, socket)
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