defmodule LayerTwoWeb.IndexController do
  use LayerTwoWeb, :controller

  def handle_login(conn, _params) do
    with {:ok, conn} <- LayerTwoAuth.IndexAuth.check_email_param_empty(conn),
         {:ok, conn} <- LayerTwoAuth.IndexAuth.check_password_param_empty(conn),
         {:ok, conn} <- LayerTwoDb.IndexQueries.check_db_if_entity_exists(conn),
         {:ok, conn, entity_hashed_password} <- LayerTwoDb.IndexQueries.get_entity_password_db(conn),
         {:ok, conn} <- LayerTwoAuth.IndexAuth.check_entity_password(conn, entity_hashed_password),
         {:ok, conn, entity_uuid} <- LayerTwoDb.IndexQueries.get_entity_uuid(conn),
         {:ok, conn} <- LayerTwoAuth.IndexAuth.assign_entity_token_to_session(conn, entity_uuid),
         {:ok, conn, entity_type} <- LayerTwoDb.IndexQueries.get_entity_type(conn, entity_uuid),
         {:ok, conn} <- LayerTwoAuth.IndexAuth.assign_entity_type_to_session(conn, entity_type)
        do
          redirect(conn, to: "/")
        else
          {:error, conn} -> redirect(conn, to: "/")
        end
  end

  def render_index_page(conn, _params) do
    with {:ok, conn} <- LayerTwoAuth.IndexAuth.check_if_entity_logged_in(conn),
         {:ok, entity_type} <- LayerTwoAuth.IndexAuth.get_entity_type_from_session(conn)
    do
      case entity_type do
        "Person" -> render conn, "user_main.html", entity_token: get_session(conn, :entity_token)
        "Authorities" -> render conn, "authorities_main.html", entity_token: get_session(conn, :entity_token)
        "Business" -> render conn, "business_main.html", entity_token: get_session(conn, :entity_token)
        "Tourism" -> render conn, "tourism_main.html", entity_token: get_session(conn, :entity_token)
      end
    else
      {:error, conn} -> render conn, "index.html", entity_token: "none"
    end
  end
  

end
