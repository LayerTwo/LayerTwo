defmodule LayertwoDb.IndexQueries do

  def check_db_if_entity_exists(conn) do
      form_input_email = conn.params["login_form"]["email"]

      check_db_entity_query = "MATCH (Entity {entity_email: {email_param}}) return Entity.entity_email"
      check_db_entity_params = %{email_param: form_input_email}

      db_query_result = Bolt.Sips.query(Bolt.Sips.conn, check_db_entity_query, check_db_entity_params)

      case db_query_result do
        {:ok, []} -> {:error, conn}
        {:error, _reason} -> {:error, conn}
        {:ok, [%{"Entity.entity_email" => ^form_input_email}]} -> {:ok, conn}
      end
  end

  def get_entity_type(conn, entity_uuid) do
    check_db_entity_query = "MATCH (Entity {entity_uuid: {entity_param}}) return Entity.entity_type"
    check_db_entity_params = %{entity_param: entity_uuid}

    db_query_result = Bolt.Sips.query(Bolt.Sips.conn, check_db_entity_query, check_db_entity_params)

    case db_query_result do
      {:ok, []} -> {:error, conn}
      {:error, _reason} -> {:error, conn}
      {:ok, [%{"Entity.entity_type" => entity_type}]} -> {:ok, conn, entity_type}
    end
  end

  def get_entity_password_db(conn) do
     form_input_email = conn.params["login_form"]["email"]

      get_db_password_query = "MATCH (Entity {entity_email: {email_param}}) return Entity.entity_password"
      get_db_password_params = %{email_param: form_input_email}

      password_query_result = Bolt.Sips.query(Bolt.Sips.conn, get_db_password_query, get_db_password_params)

     case password_query_result do
       {:ok, []} -> {:error, conn}
       {:error, _reason} -> {:error, conn}
       {:ok, [%{"Entity.entity_password" => entity_hashed_password}]} -> {:ok, conn, entity_hashed_password}
     end
   end

   def get_entity_uuid(conn) do
        form_input_email = conn.params["login_form"]["email"]

        get_db_entity_uuid_query = "MATCH (Entity {entity_email: {email_param}}) return Entity.entity_uuid"
        get_db_entity_uuid_params = %{email_param: form_input_email}

        uuid_query_result = Bolt.Sips.query(Bolt.Sips.conn, get_db_entity_uuid_query, get_db_entity_uuid_params)
        case uuid_query_result do
          {:ok, []} -> {:error, conn}
          {:error, _} -> {:error, conn}
          {:ok, [%{"Entity.entity_uuid" => entity_uuid}]} -> {:ok, conn, entity_uuid}
        end
   end

      def get_entity_ws_uuid(conn, entity_uuid) do

        get_db_entity_ws_uuid_query = "MATCH (Entity {entity_uuid: {uuid_param}}) return Entity.entity_ws_uuid"
        get_db_entity_ws_uuid_params = %{uuid_param: entity_uuid}

        uuid_query_result = Bolt.Sips.query(Bolt.Sips.conn, get_db_entity_ws_uuid_query, get_db_entity_ws_uuid_params)
        case uuid_query_result do
          {:ok, []} -> {:error, conn}
          {:error, _} -> {:error, conn}
          {:ok, [%{"Entity.entity_ws_uuid" => entity_ws_uuid}]} -> {:ok, conn, entity_ws_uuid}
        end
   end


end
