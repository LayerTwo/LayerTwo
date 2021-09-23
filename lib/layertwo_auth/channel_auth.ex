defmodule LayertwoAuth.ChannelAuth do

    def check_if_channel_init_join_allowed(entity_ws_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid} <- LayertwoDb.ChannelInitQueries.get_entity_channel_permission_and_ws_uuid(socket),
             {:ok, socket} <- check_ws_uuid(entity_ws_uuid, db_entity_ws_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else

             {:error, socket} ->{:error, socket}
             end
    end

    def check_if_channel_personal_join_allowed(entity_ws_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid} <- LayertwoDb.ChannelPersonalQueries.get_entity_channel_permission_and_ws_uuid(socket),
             {:ok, socket} <- check_ws_uuid(entity_ws_uuid, db_entity_ws_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else
             {:error, socket} -> {:error, socket}
             end
    end

    def check_if_channel_social_join_allowed(entity_ws_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid} <- LayertwoDb.ChannelSocialQueries.get_entity_channel_permission_and_ws_uuid(socket),
             {:ok, socket} <- check_ws_uuid(entity_ws_uuid, db_entity_ws_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else
             {:error, socket} -> {:error, socket}
             end
    end

    def check_if_city_local_channel_allowed(entity_ws_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid} <- LayertwoDb.ChannelCityLocalQueries.get_entity_channel_permission_and_ws_uuid(socket),
             {:ok, socket} <- check_ws_uuid(entity_ws_uuid, db_entity_ws_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else
             {:error, socket} -> {:error, socket}
             end
    end

    def check_if_city_channel_allowed(city_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_city_uuid} <- LayertwoDb.ChannelCityQueries.get_entity_channel_permission_and_city_uuid(socket),
             {:ok, socket} <- check_ws_uuid(city_uuid, db_city_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else
             {:error, socket} -> {:error, socket}
             end
    end

    def check_if_country_channel_allowed(country_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_country_uuid} <- LayertwoDb.ChannelCountryQueries.get_entity_channel_permission_and_country_uuid(socket),
             {:ok, socket} <- check_ws_uuid(country_uuid, db_country_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else
             {:error, socket} -> {:error, socket}
             end
    end

    def check_if_channel_world_join_allowed(entity_ws_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid} <- LayertwoDb.ChannelWorldQueries.get_entity_channel_permission_and_ws_uuid(socket),
             {:ok, socket} <- check_ws_uuid(entity_ws_uuid, db_entity_ws_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else
             {:error, socket} -> {:error, socket}
             end
    end

    def check_if_channel_space_join_allowed(entity_ws_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid} <- LayertwoDb.ChannelSpaceQueries.get_entity_channel_permission_and_ws_uuid(socket),
             {:ok, socket} <- check_ws_uuid(entity_ws_uuid, db_entity_ws_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else
             {:error, socket} -> {:error, socket}
             end
    end

    def check_if_channel_visit_join_allowed(entity_ws_uuid, socket) do
        with {:ok, socket, db_entity_channel_permission, db_entity_ws_uuid} <- LayertwoDb.ChannelVisitQueries.get_entity_channel_permission_and_ws_uuid(socket),
             {:ok, socket} <- check_ws_uuid(entity_ws_uuid, db_entity_ws_uuid, socket),
             {:ok, socket} <- check_entity_permission(db_entity_channel_permission, socket)
             do
             {:ok, socket}
             else
             {:error, socket} -> {:error, socket}
             end
    end

    def check_entity_permission(db_entity_channel_permission, socket) do
        if(db_entity_channel_permission === "allowed") do
            {:ok, socket}
        else
            {:error, socket}
        end
    end

    def check_ws_uuid(entity_ws_uuid, db_entity_ws_uuid, socket) do
        if (entity_ws_uuid === db_entity_ws_uuid) do
            {:ok, socket}
        else
            {:error, socket}
        end
    end
end
