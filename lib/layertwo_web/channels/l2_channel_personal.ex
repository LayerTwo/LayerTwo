defmodule LayertwoWeb.L2ChannelPersonal do
    use LayertwoWeb, :channel
  
  
    def join("l2_personal:" <> entity_ws_uuid, _message, socket) do
      with {:ok, socket} <- LayertwoAuth.ChannelAuth.check_if_channel_personal_join_allowed(entity_ws_uuid, socket)
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