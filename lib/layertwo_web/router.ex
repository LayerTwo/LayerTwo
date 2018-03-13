defmodule LayertwoWeb.Router do
  use LayertwoWeb, :router

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

  scope "/", LayertwoWeb do
    pipe_through :browser # Use the default browser stack

    get "/", IndexController, :render_index_page

    post "/", IndexController, :handle_login

    delete "/", IndexController, :handle_logout
  end

  # Other scopes may use custom stacks.
  # scope "/api", LayertwoWeb do
  #   pipe_through :api
  # end
end
