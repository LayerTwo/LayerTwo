defmodule LayerTwoAuth.IndexAuth do
  use LayerTwoWeb, :controller
  import Comeonin.Argon2


  def check_if_entity_logged_in(conn) do
    with {:ok, conn} <- check_if_entity_token_valid(conn)
      do
        {:ok, conn}
      else
        {:error, conn} -> {:error, conn}
    end
  end

  def assign_entity_type_to_session(conn, entity_type) do
    conn = put_session(conn, :entity_type, entity_type)
    {:ok, conn}
  end

  def assign_entity_token_to_session(conn, entity_uuid) do
    entity_token = Phoenix.Token.sign(conn, System.get_env("layertwo_token_salt"), entity_uuid)
    conn = put_session(conn, :entity_token, entity_token)
    {:ok, conn}
  end

  def get_entity_type_from_session(conn) do
    entity_type = get_session(conn, :entity_type)
    {:ok, entity_type}
  end

  def check_if_entity_token_valid(conn) do
    case Phoenix.Token.verify(conn, System.get_env("layertwo_token_salt"), get_session(conn, :entity_token), max_age: 86400) do
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


  def check_entity_password(conn, entity_hashed_password) do
       form_input_password = conn.params["login_form"]["password"]
       check_password_result = checkpw(form_input_password, entity_hashed_password)

    case check_password_result do
        true -> {:ok, conn}
        _ -> dummy_checkpw()
            {:error, conn}
    end
  end


end
