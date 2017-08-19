defmodule LayerTwoAuth.IndexAuth do
  use LayerTwoWeb, :controller
  import Comeonin.Argon2


  def check_if_user_logged_in(conn) do
    with {:ok, conn} <- check_if_user_token_valid(conn)
      do
        {:ok, conn}
      else
        {:error, conn} -> {:error, conn}
    end
  end


  defp check_if_user_token_valid(conn) do
    case Phoenix.Token.verify(conn, System.get_env("layertwo_token_salt"), get_session(conn, :user_token), max_age: 86400) do
          {:ok, _} -> {:ok, conn}
          {:error, _} -> {:error, conn}
    end
  end


  def check_email_param_empty(conn) do
    case conn.params["login_form"]["email"] do
          "" -> {:error, conn}
          _ -> {:ok, conn}
    end
  end


  def check_password_param_empty(conn) do
    case conn.params["login_form"]["password"] do
         "" -> {:error, conn}
          _ -> {:ok, conn}
    end
  end


  def check_user_password(conn, user_hashed_password) do
       form_input_password = conn.params["login_form"]["password"]
       check_password_result = checkpw(form_input_password, user_hashed_password)

    case check_password_result do
        true -> {:ok, conn}
        _ -> dummy_checkpw()
            {:error, conn}
    end
  end


  def assign_token_to_session(conn) do
    form_input_email = conn.params["login_form"]["email"]

    get_db_user_uuid_query = "MATCH (User:Person {email: {email_param}}) return User.uuid"
    get_db_user_uuid_params = %{email_param: form_input_email}

    db_conn = Bolt.Sips.conn

    uuid_query_result = Bolt.Sips.query(db_conn, get_db_user_uuid_query, get_db_user_uuid_params)

    case uuid_query_result do
      {:ok, []} -> {:error, conn}
      {:error, _} -> {:error, conn}
      {:ok, [%{"User.uuid" => db_user_uuid}]} ->
            user_token = Phoenix.Token.sign(conn, System.get_env("layertwo_token_salt"), db_user_uuid)
            conn = put_session(conn, :user_token, user_token)
            {:ok, conn}
    end
  end


end
