defmodule LayertwoDb.ChannelInitQueries do
  def get_basic_info_version_number(socket) do
    entity_uuid = socket.assigns["entity_uuid"]

    check_db_entity_query = "MATCH (Entity {entity_uuid: {entity_param}}) return Entity.entity_basic_info_version"

    check_db_entity_params = %{entity_param: entity_uuid}

    db_conn = Bolt.Sips.conn()
    db_query_result = Bolt.Sips.query(db_conn, check_db_entity_query, check_db_entity_params)

    case db_query_result do
      {:ok, []} -> {:error, socket}
      {:error, _reason} -> {:error, socket}
      {:ok, [%{"Entity.entity_basic_info_version" => db_entity_info_version_number}]} -> {:ok, socket, db_entity_info_version_number}
    end
  end

  def get_entity_basic_info(socket) do
    entity_uuid = socket.assigns["entity_uuid"]

    get_db_entity_query = "MATCH (Entity {entity_uuid:{entity_param}})-[CURRENT_CITY]->(City:City)-[CITY_IN]->(Country:Country)
                           MATCH (City)<-[:CITY_LOCAL]-(CityLocal:CityLocal)
                           RETURN Entity.entity_basic_info_version,
                                  Entity.entity_name,
                                  Entity.entity_latitude,
                                  Entity.entity_longitude,
                                  CityLocal.default_zoom,
                                  City.latitude,
                                  City.longitude,
                                  City.city_uuid,
                                  City.default_zoom,
                                  Country.latitude,
                                  Country.longitude,
                                  Country.country_uuid,
                                  Country.default_zoom;"

    get_db_entity_params = %{entity_param: entity_uuid}

    db_conn = Bolt.Sips.conn()
    db_query_result = Bolt.Sips.query(db_conn, get_db_entity_query, get_db_entity_params)

    case db_query_result do
      {:ok, []} -> {:error, socket}
      {:error, _reason} -> {:error, socket}
      {:ok,[%{"Entity.entity_basic_info_version" => db_entity_info_version_number,
              "Entity.entity_name" => db_entity_name,
              "Entity.entity_latitude" => db_entity_latitude,
              "Entity.entity_longitude" => db_entity_longitude,
              "City.latitude" => db_city_latitude,
              "City.longitude" => db_city_longitude,
              "Country.latitude" => db_country_latitude,
              "Country.longitude" => db_country_longitude,
              "City.city_uuid" => db_ws_city_uuid,
              "Country.country_uuid" => db_ws_country_uuid,
              "CityLocal.default_zoom" => db_city_local_default_zoom,
              "City.default_zoom" => db_city_default_zoom,
              "Country.default_zoom" => db_country_default_zoom
            }]} -> {:ok, socket,
                         db_entity_info_version_number,
                         db_entity_name,
                         db_entity_latitude,
                         db_entity_longitude,
                         db_city_local_default_zoom,
                         db_city_latitude,
                         db_city_longitude,
                         db_city_default_zoom,
                         db_country_latitude,
                         db_country_longitude,
                         db_country_default_zoom,
                         db_ws_city_uuid,
                         db_ws_country_uuid}
    end
  end

  def get_entity_channel_permission_and_ws_uuid(socket) do
    entity_uuid = socket.assigns["entity_uuid"]

    check_db_entity_query = "MATCH (Entity {entity_uuid: {entity_param}}) return Entity.channel_init, Entity.entity_ws_uuid"

    check_db_entity_params = %{entity_param: entity_uuid}

    db_conn = Bolt.Sips.conn()
    db_query_result = Bolt.Sips.query(db_conn, check_db_entity_query, check_db_entity_params)

    case db_query_result do
      {:ok, []} -> {:error, socket}
      {:error, _reason} -> {:error, socket}
      {:ok, [%{"Entity.channel_init" => db_entity_channel_permission, "Entity.entity_ws_uuid" => db_entity_ws_uuid}]} -> {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid}
    end
  end

end
