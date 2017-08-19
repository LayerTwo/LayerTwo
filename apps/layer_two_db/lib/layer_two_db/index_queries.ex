defmodule LayerTwoDb.IndexQueries do

  def check_db_user_exists(conn) do
      form_input_email = conn.params["login_form"]["email"]

      check_db_user_query = "MATCH (User:Person {email: {email_param}}) return User.email"
      check_db_user_params = %{email_param: form_input_email}

      db_conn = Bolt.Sips.conn
      db_query_result = Bolt.Sips.query(db_conn, check_db_user_query, check_db_user_params)

      case db_query_result do
        {:ok, []} -> {:error, conn}
        {:error, reason} -> {:error, conn}
        {:ok, [%{"User.email" => form_input_email}]} -> {:ok, conn}
      end
    end

  def get_user_password_db(conn) do
     form_input_email = conn.params["login_form"]["email"]

      get_db_password_query = "MATCH (User:Person {email: {email_param}}) return User.password"
      get_db_password_params = %{email_param: form_input_email}

      db_conn = Bolt.Sips.conn
      password_query_result = Bolt.Sips.query(db_conn, get_db_password_query, get_db_password_params)

     case password_query_result do
       {:ok, []} -> {:error, conn}
       {:error, reason} -> {:error, conn}
       {:ok, [%{"User.password" => user_hashed_password}]} -> {:ok, conn, user_hashed_password}
     end
   end

end
