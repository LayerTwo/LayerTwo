defmodule LayerTwoWeb.IndexController do
  use LayerTwoWeb, :controller


  def render_index_page(conn, _params) do
    with {:ok, conn} <- LayerTwoAuth.IndexAuth.check_if_user_logged_in(conn)
    do
      render conn, "main.html", user_token: get_session(conn, :user_token)
    else
      {:error, conn} -> render conn, "index.html", user_token: "none"
    end
  end


  def handle_login(conn, _params) do
    with {:ok, conn} <- LayerTwoAuth.IndexAuth.check_email_param_empty(conn),
         {:ok, conn} <- LayerTwoAuth.IndexAuth.check_password_param_empty(conn),
         {:ok, conn} <- LayerTwoDb.IndexQueries.check_db_user_exists(conn),
         {:ok, conn, user_hashed_password} <- LayerTwoDb.IndexQueries.get_user_password_db(conn),
         {:ok, conn} <- LayerTwoAuth.IndexAuth.check_user_password(conn, user_hashed_password),
         {:ok, conn} <- LayerTwoAuth.IndexAuth.assign_token_to_session(conn)
        do
          redirect(conn, to: "/")
        else
          {:error, conn} -> redirect(conn, to: "/")
        end
  end
  

end
