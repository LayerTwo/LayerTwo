defmodule LayertwoWeb.L2ChannelInit do
    use LayertwoWeb, :channel


    def join("l2_init:" <> entity_ws_uuid, _message, socket) do
      with {:ok, socket} <- LayertwoAuth.ChannelAuth.check_if_channel_init_join_allowed(entity_ws_uuid, socket)
           do
           {:ok, socket}
           else
           {:error, _socket} -> {:error, "Access Denied!"}
           end
    end

    def handle_in("connected_to_l2_init", _message, socket) do
      push socket, "entity_basic_info_version_request", %{}
      {:noreply, socket}
    end

    def handle_in("entity_basic_info_version", %{"current_version" => entity_basic_info_version_number}, socket) do
      with {:ok, socket} <- check_entity_basic_info_version(socket, entity_basic_info_version_number),
           {:ok, socket, db_entity_info_version_number} <- LayertwoDb.ChannelInitQueries.get_basic_info_version_number(socket),
           {:ok, socket} <- compare_db_version_to_client_version(socket, entity_basic_info_version_number, db_entity_info_version_number)
      do
        push socket, "entity_basic_info_version_check", %{"info_version"=>"current"}
        {:noreply, socket}
      else
        {:error, socket} -> push socket, "entity_basic_info_version_check", %{"info_version"=>"outdated"}
                            {:noreply, socket}
      end
    end

    def handle_in("update_entity_basic_info_request", _message, socket) do
      with {:ok, socket,
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
                 db_ws_country_uuid
                 } <- LayertwoDb.ChannelInitQueries.get_entity_basic_info(socket)
        do
          push socket, "update_entity_basic_info", %{"error" => "false",
                                                     "entity_basic_info_version" => db_entity_info_version_number,
                                                     "entity_name" => db_entity_name,
                                                     "entity_latitude" => db_entity_latitude,
                                                     "entity_longitude" => db_entity_longitude,
                                                     "city_latitude" => db_city_latitude,
                                                     "city_longitude" => db_city_longitude,
                                                     "country_latitude" => db_country_latitude,
                                                     "country_longitude" => db_country_longitude,
                                                     "city_ws_uuid" => db_ws_city_uuid,
                                                     "country_ws_uuid" => db_ws_country_uuid,
                                                     "city_local_default_zoom" => db_city_local_default_zoom,
                                                     "city_default_zoom" => db_city_default_zoom,
                                                     "country_default_zoom" => db_country_default_zoom
                                                    }
          {:noreply, socket}
        else
          {:error, socket} -> push socket, "update_entity_basic_info", %{"error" => "Unable to retrieve data!"}
                            {:error, socket}
        end
    end

    def handle_in(_arg, %{}, socket) do
      {:noreply, socket}
    end

    def check_entity_basic_info_version(socket, entity_basic_info_version_number) do
      if (entity_basic_info_version_number !== "false") do
        {:ok, socket}
      else
        {:error, socket}
      end
    end

    def compare_db_version_to_client_version(socket, entity_basic_info_version_number, db_entity_info_version_number) do
      if (entity_basic_info_version_number === db_entity_info_version_number) do
        {:ok, socket}
      else
        {:error, socket}
      end
    end

end

