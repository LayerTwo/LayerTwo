defmodule LayerTwoWeb.L2UserLocal do
    use LayerTwoWeb, :channel
  
  
    def join("l2_user:local", _message, socket) do
      :timer.send_interval(5_000, :ping)
      {:ok, socket}
    end

    def handle_info(:ping, socket) do
      push socket, "local_msg", %{}
      {:noreply, socket}
    end
  
  end
  