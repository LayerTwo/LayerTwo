defmodule LayerTwoWeb.L2InitChannel do
    use LayerTwoWeb, :channel
  
  
    def join("l2_init:main", _message, socket) do
      :timer.send_interval(5_000, :ping)
      {:ok, socket}
    end

    def handle_info(:ping, socket) do
      push socket, "init_msg", %{}
      {:noreply, socket}
    end
  
  end
  