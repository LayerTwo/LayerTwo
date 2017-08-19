defmodule LayerTwoWeb.Router do
  use LayerTwoWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LayerTwoWeb do
    pipe_through :browser # Use the default browser stack

    get "/", IndexController, :render_index_page

    post "/", IndexController, :handle_login
    
  end

  # Other scopes may use custom stacks.
  # scope "/api", LayerTwoWeb do
  #   pipe_through :api
  # end
end
