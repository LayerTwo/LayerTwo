defmodule LayertwoDb.ChannelPersonalQueries do
  def get_entity_channel_permission_and_ws_uuid(socket) do
    entity_uuid = socket.assigns["entity_uuid"]

    check_db_entity_query = "MATCH (Entity {entity_uuid: {entity_param}})
                             RETURN Entity.channel_personal, Entity.entity_ws_uuid"

    check_db_entity_params = %{entity_param: entity_uuid}

    db_query_result = Bolt.Sips.query(Bolt.Sips.conn, check_db_entity_query, check_db_entity_params)

    case db_query_result do
      {:ok, []} -> {:error, socket}
      {:error, _reason} -> {:error, socket}
      {:ok, [%{"Entity.channel_personal" => db_entity_channel_permission,
               "Entity.entity_ws_uuid" => db_entity_ws_uuid}]} -> {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid}
    end
  end
end
