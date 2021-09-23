defmodule LayertwoDb.ChannelCountryQueries do


    def get_entity_channel_permission_and_country_uuid(socket) do
      entity_uuid = socket.assigns["entity_uuid"]

      check_db_entity_query = "MATCH (Entity {entity_uuid: $entity_param})-[:ENTITY_IN]->(:City)-[:CITY_IN]->(Country:Country) return Entity.channel_city_local, Country.country_uuid"

      check_db_entity_params = %{entity_param: entity_uuid}

      db_query_result = Bolt.Sips.query(Bolt.Sips.conn, check_db_entity_query, check_db_entity_params)

      {queryStatus, %Bolt.Sips.Response{results: results}} = db_query_result
      db_query_result = {queryStatus, results}

      case db_query_result do
        {:ok, []} -> {:error, socket}
        {:error, _reason} -> {:error, socket}
        {:ok, [%{"Entity.channel_city_local" => db_entity_channel_permission, "Country.country_uuid" => db_country_uuid}]} -> {:ok, socket, db_entity_channel_permission, db_country_uuid}
      end
    end
end
