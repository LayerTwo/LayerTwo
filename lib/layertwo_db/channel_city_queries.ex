defmodule LayertwoDb.ChannelCityQueries do


    def get_entity_channel_permission_and_city_uuid(socket) do
      entity_uuid = socket.assigns["entity_uuid"]

      check_db_entity_query = "MATCH (Entity {entity_uuid: $entity_param})-[:ENTITY_IN]->(City:City) return Entity.channel_city_local, City.city_uuid"

      check_db_entity_params = %{entity_param: entity_uuid}

      db_query_result = Bolt.Sips.query(Bolt.Sips.conn, check_db_entity_query, check_db_entity_params)

      {queryStatus, %Bolt.Sips.Response{results: results}} = db_query_result
      db_query_result = {queryStatus, results}

      case db_query_result do
        {:ok, []} -> {:error, socket}
        {:error, _reason} -> {:error, socket}
        {:ok, [%{"Entity.channel_city_local" => db_entity_channel_permission, "City.city_uuid" => db_city_uuid}]} -> {:ok, socket, db_entity_channel_permission, db_city_uuid}
      end
    end
end
