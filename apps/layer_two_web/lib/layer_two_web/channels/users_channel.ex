defmodule LayerTwoWeb.UsersChannel do
    use LayerTwoWeb, :channel
  
  
    def join("users:"<>user_token, _message, socket) do
      {:ok, socket}
    end
  
  
  end
  