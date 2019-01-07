defmodule LayertwoWeb.IndexController do
  use LayertwoWeb, :controller

  def handle_login(conn, _params) do
    with {:ok, conn} <- LayertwoAuth.IndexAuth.check_email_param_valid_string(conn),
         {:ok, conn} <- LayertwoAuth.IndexAuth.check_password_param_valid_string(conn),
         {:ok, conn} <- LayertwoAuth.IndexAuth.check_email_param_empty(conn),
         {:ok, conn} <- LayertwoAuth.IndexAuth.check_password_param_empty(conn),
         {:ok, conn} <- LayertwoDb.IndexQueries.check_db_if_entity_exists(conn),
         {:ok, conn, entity_hashed_password} <- LayertwoDb.IndexQueries.get_entity_password_db(conn),
         {:ok, conn} <- LayertwoAuth.IndexAuth.check_entity_password(conn, entity_hashed_password),
         {:ok, conn, entity_uuid} <- LayertwoDb.IndexQueries.get_entity_uuid(conn),
         {:ok, conn} <- LayertwoAuth.IndexAuth.assign_entity_token_to_session(conn, entity_uuid),
         {:ok, conn, entity_ws_uuid} <- LayertwoDb.IndexQueries.get_entity_ws_uuid(conn, entity_uuid),
         {:ok, conn} <- LayertwoAuth.IndexAuth.assign_entity_ws_uuid_to_session(conn, entity_ws_uuid),
         {:ok, conn, entity_type} <- LayertwoDb.IndexQueries.get_entity_type(conn, entity_uuid),
         {:ok, conn} <- LayertwoAuth.IndexAuth.assign_entity_type_to_session(conn, entity_type)
        do
          redirect(conn, to: "/")
        else
          {:error, conn} -> redirect(conn, to: "/")
        end
  end

  def handle_logout(conn, _params) do
    conn = configure_session(conn, drop: true)
    render conn, "index.html", entity_token: "none"
  end

  def render_index_page(conn, _params) do
    with {:ok, conn} <- LayertwoAuth.IndexAuth.check_if_entity_logged_in(conn),
         {:ok, entity_type} <- LayertwoAuth.IndexAuth.get_entity_type_from_session(conn)
    do
      case entity_type do
        "Person" -> render conn, "user_main.html", %{entity_token: get_session(conn, :entity_token), entity_ws_uuid: get_session(conn, :entity_ws_uuid), leaflet_app_id: System.get_env("LEAFLET_APP_ID"), leaflet_app_code: System.get_env("LEAFLET_APP_CODE")}
        "Authorities" -> render conn, "authorities_main.html", %{entity_token: get_session(conn, :entity_token), entity_ws_uuid: get_session(conn, :entity_ws_uuid)}
        "Business" -> render conn, "business_main.html", %{entity_token: get_session(conn, :entity_token), entity_ws_uuid: get_session(conn, :entity_ws_uuid)}
        "Tourism" -> render conn, "tourism_main.html", %{entity_token: get_session(conn, :entity_token), entity_ws_uuid: get_session(conn, :entity_ws_uuid)}
      end
    else
      {:error, conn} -> render conn, "index.html", entity_token: "none"
    end
  end


end
