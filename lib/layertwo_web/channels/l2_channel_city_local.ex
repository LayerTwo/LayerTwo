defmodule LayertwoWeb.L2ChannelCityLocal do
  use LayertwoWeb, :channel


  def join("l2_city_local:" <> entity_ws_uuid, _message, socket)
  do
    with {:ok, socket} <- LayertwoAuth.ChannelAuth.check_if_city_local_channel_allowed(entity_ws_uuid, socket)
         do
         {:ok, socket}
         else
         {:error, _socket} -> {:error, "Access Denied!"}
         end
  end


  def handle_in("l2-city-local-problem-form-data-submit",
                %{"problem_title" => local_problem_title,
                "problem_importance" => local_problem_importance,
                "problem_description" => local_problem_description,
                "problem_photo" => local_problem_photo,
                "problem_latitude" => local_problem_latitude,
                "problem_longitude" => local_problem_longitude},
                socket)
  do
    with {:ok, socket, local_problem_title_valid} <- check_if_local_problem_title_valid(local_problem_title, socket),
         {:ok, socket, local_problem_description_valid} <- check_if_local_problem_description_valid(local_problem_description, socket),
         {:ok, socket, local_problem_photo_id} <- handle_local_problem_photo(local_problem_photo, socket),
         {:ok, socket, local_problem_importance_int_valid} <-LayertwoSanitize.SanitizeIo.convert_importance_string_to_int(local_problem_importance, socket),
         {:ok, socket, local_problem_latitude_float_valid} <- LayertwoSanitize.SanitizeIo.convert_latitude_string_to_float(local_problem_latitude, socket),
         {:ok, socket, local_problem_longitude_float_valid} <- LayertwoSanitize.SanitizeIo.convert_longitude_string_to_float(local_problem_longitude, socket),
         {:ok, socket} <- check_if_local_problem_location_valid(local_problem_latitude_float_valid, local_problem_longitude_float_valid, socket),
         {:ok, socket, city_uuid} <- LayertwoDb.ChannelCityLocalQueries.save_local_problem_db(local_problem_title_valid,
                                                                                              local_problem_importance_int_valid,
                                                                                              local_problem_description_valid,
                                                                                              local_problem_latitude_float_valid,
                                                                                              local_problem_longitude_float_valid,
                                                                                              local_problem_photo_id,
                                                                                              socket),
         {:ok, socket} <- notify_entities(city_uuid, local_problem_latitude_float_valid, local_problem_longitude_float_valid, socket)
    do
      push socket, "l2-city-local-problem-submission-success", %{}
      {:noreply, socket}
    else
      {:error, socket} -> push socket, "l2-city-local-problem-submission-failed", %{}
      {:noreply, socket}
    end
  end


  def handle_in("l2-city-local-problem-update-form-data-submit",
                %{"problem_uuid" => local_problem_uuid,
                "problem_title" => local_problem_title,
                "problem_importance" => local_problem_importance,
                "problem_description" => local_problem_description,
                "problem_photo" => local_problem_photo,
                "problem_latitude" => local_problem_latitude,
                "problem_longitude" => local_problem_longitude},
                socket)
    do
    with {:ok, socket, db_local_problem_author_uuid, city_uuid, db_local_problem_original_latitude, db_local_problem_original_longitude} <- LayertwoDb.ChannelCityLocalQueries.get_local_problem_author_city_latitude_longitude(local_problem_uuid, socket),
         {:ok, socket} <- check_local_problem_author_uuid(db_local_problem_author_uuid, socket),
         {:ok, socket, local_problem_title_valid} <- check_if_local_problem_title_valid(local_problem_title, socket),
         {:ok, socket, local_problem_description_valid} <- check_if_local_problem_description_valid(local_problem_description, socket),
         {:ok, socket, local_problem_importance_int_valid} <-LayertwoSanitize.SanitizeIo.convert_importance_string_to_int(local_problem_importance, socket),
         {:ok, socket, local_problem_latitude_float_valid} <- LayertwoSanitize.SanitizeIo.convert_latitude_string_to_float(local_problem_latitude, socket),
         {:ok, socket, local_problem_longitude_float_valid} <- LayertwoSanitize.SanitizeIo.convert_longitude_string_to_float(local_problem_longitude, socket),
         {:ok, socket} <- check_if_local_problem_location_valid(local_problem_latitude_float_valid, local_problem_longitude_float_valid, socket),
         {:ok, socket, previously_affected_entities_list} <- LayertwoDb.ChannelCityLocalQueries.get_list_of_entities(city_uuid, db_local_problem_original_latitude, db_local_problem_original_longitude, socket),
         {:ok, socket, local_problem_uuid_safe, local_problem_timestamp} <- LayertwoDb.ChannelCityLocalQueries.update_local_problem_db(local_problem_uuid,
                                                                                              local_problem_title_valid,
                                                                                              local_problem_importance_int_valid,
                                                                                              local_problem_description_valid,
                                                                                              local_problem_latitude_float_valid,
                                                                                              local_problem_longitude_float_valid,
                                                                                              socket),
         {:ok, socket, notify_entities_list} <- LayertwoDb.ChannelCityLocalQueries.get_list_of_entities(city_uuid, local_problem_latitude_float_valid, local_problem_longitude_float_valid, socket),
         {:ok, socket} <- notify_entities_update_local_problem(local_problem_uuid_safe,
                                                               local_problem_title_valid,
                                                               local_problem_importance_int_valid,
                                                               local_problem_description_valid,
                                                               local_problem_latitude_float_valid,
                                                               local_problem_longitude_float_valid,
                                                               local_problem_timestamp,
                                                               notify_entities_list,
                                                               previously_affected_entities_list,
                                                               socket)
    do
      push socket, "l2-city-local-problem-update-success", %{}
      {:noreply, socket}
    else
      {:error, socket} -> push socket, "l2-city-local-problem-update-failed", %{}
      {:noreply, socket}
    end
  end

  def handle_in("l2-city-local-goals-list-request", %{}, socket)
  do
    {:reply, :ok, socket}
  end


  def handle_in("l2-city-local-problems-list-request", %{}, socket)
  do
    with {:ok, socket, local_problems_list} <- LayertwoDb.ChannelCityLocalQueries.get_entity_local_problems(socket),
         {:ok, socket, local_problems_list_safe_including_is_author} <- handle_local_problems_db_list(local_problems_list, socket)
    do
      push socket, "l2-city-local-problems-list-db", %{"local_problems_list" => local_problems_list_safe_including_is_author}
      {:reply, :ok, socket}
    else
      {:error, socket} -> {:noreply, socket}
    end

  end

  def handle_in("city-local-problem-description-request", %{"local_problem_uuid" => local_problem_uuid}, socket )
  do
    with {:ok, socket, db_entity_latitude, db_entity_longitude} <- LayertwoDb.ChannelCityLocalQueries.get_entity_latitude_longitude(socket),
         {:ok, socket, db_local_problem_latitude, db_local_problem_longitude} <- LayertwoDb.ChannelCityLocalQueries.get_local_problem_latitude_longitude(local_problem_uuid, socket),
         {:ok, socket} <- check_city_local_problem_range_valid(db_local_problem_latitude,
                                                               db_local_problem_longitude,
                                                               db_entity_latitude,
                                                               db_entity_longitude,
                                                               socket),
         {:ok, socket, db_local_problem_description, db_local_problem_photo} <- LayertwoDb.ChannelCityLocalQueries.get_local_problem_description(local_problem_uuid, socket),
         {:ok, socket, local_problem_description_safe} <- LayertwoSanitize.SanitizeIo.escape_html(db_local_problem_description, socket)
    do
      push socket, "l2-city-local-problem-description-db", %{"local_problem_uuid" => local_problem_uuid, "local_problem_description" => local_problem_description_safe, "local_problem_photo" => db_local_problem_photo}
      {:noreply, socket}
    else
    {:error, socket} -> {:noreply, socket}
    end
  end

  def handle_in("delete-local-problem", %{"local_problem_uuid" => local_problem_uuid}, socket)
  do
    with {:ok, socket, db_local_problem_author_uuid} <- LayertwoDb.ChannelCityLocalQueries.get_local_problem_author_uuid(local_problem_uuid, socket),
         {:ok, socket} <- check_local_problem_author_uuid(db_local_problem_author_uuid, socket),
         {:ok, socket, db_local_problem_latitude, db_local_problem_longitude, db_local_problem_photo_id} <- LayertwoDb.ChannelCityLocalQueries.get_local_problem_latitude_longitude_photo_id(local_problem_uuid, socket),
         {:ok, socket, db_local_problem_city_uuid} <- LayertwoDb.ChannelCityLocalQueries.get_local_problem_city_uuid(local_problem_uuid, socket),
         {:ok, socket, db_local_problem_deletion_result} <- LayertwoDb.ChannelCityLocalQueries.delete_local_problem(local_problem_uuid, socket),
         {:ok, socket} <- delete_local_problem_photo(db_local_problem_photo_id, socket),
         {:ok, socket} <- handle_db_local_problem_deletion_result(db_local_problem_deletion_result, socket),
         {:ok, socket, notify_entities_list} <- LayertwoDb.ChannelCityLocalQueries.get_list_of_entities(db_local_problem_city_uuid, db_local_problem_latitude, db_local_problem_longitude, socket),
         {:ok, socket} <- broadcast_local_problem_delete_notification(notify_entities_list, local_problem_uuid, socket)
    do
      {:reply, :ok, socket}
    else
      {:error, socket} -> {:noreply, socket}
    end
  end

  def handle_in(_arg, %{}, socket) do
    {:noreply, socket}
  end

  def check_local_problem_author_uuid(db_local_problem_author_uuid, socket)
  do
    if(db_local_problem_author_uuid === socket.assigns["entity_uuid"]) do
      {:ok, socket}
    else
      {:error, socket}
    end
  end

  def delete_local_problem_photo(db_local_problem_photo_id, socket)
  do
    File.rm("priv/static/uploads/"<>db_local_problem_photo_id)
    {:ok, socket}
  end

  def handle_db_local_problem_deletion_result(db_local_problem_deletion_result, socket) do
    if(db_local_problem_deletion_result === true) do
      {:ok, socket}
    else
      {:error, socket}
    end
  end

  def check_if_local_problem_title_valid(local_problem_title, socket)
  do
    if(is_binary(local_problem_title) && String.length(local_problem_title) > 0)
    do
      {:ok, socket, local_problem_title}
    else
    end
  end

  def check_if_local_problem_description_valid(local_problem_description, socket)
  do
    if(is_binary(local_problem_description) && String.length(local_problem_description) > 0)
    do
      {:ok, socket, local_problem_description}
    else
    end
  end

  def handle_local_problem_photo(local_problem_photo, socket)
  do
    if(local_problem_photo !== "none")
    do
      {start, length} = :binary.match(local_problem_photo, ";base64,")
      raw = :binary.part(local_problem_photo, start + length, byte_size(local_problem_photo) - start - length)
      photo_binary = Base.decode64!(raw)
      local_problem_photo_id = UUID.uuid4<>UUID.uuid4<>".gif"
      File.write!("priv/static/uploads/"<>local_problem_photo_id,photo_binary,[:write])
      {:ok, socket, local_problem_photo_id}
    else
      local_problem_photo_id = "none"
      {:ok, socket, local_problem_photo_id}
    end
  end

  def check_if_local_problem_location_valid(local_problem_latitude_float_valid,
                                            local_problem_longitude_float_valid,
                                            socket)
  do
    with {:ok, socket, db_entity_latitude, db_entity_longitude} <- LayertwoDb.ChannelCityLocalQueries.get_entity_latitude_longitude(socket),
         {:ok, socket} <- check_city_local_problem_range_valid(local_problem_latitude_float_valid,
                                                          local_problem_longitude_float_valid,
                                                          db_entity_latitude,
                                                          db_entity_longitude,
                                                          socket)
    do
      {:ok, socket}
    else
      {:error, socket} -> {:error, socket}
    end
  end

  def check_city_local_problem_range_valid(local_problem_latitude_float_valid,
                                           local_problem_longitude_float_valid,
                                           db_entity_latitude,
                                           db_entity_longitude,
                                           socket)
  do
    if ((db_entity_latitude-0.00075) <= local_problem_latitude_float_valid &&
        (db_entity_latitude+0.00075) >= local_problem_latitude_float_valid &&
        (db_entity_longitude-0.00100) <= local_problem_longitude_float_valid &&
        (db_entity_longitude+0.00100) >= local_problem_longitude_float_valid)
    do
      {:ok, socket}
    else
      {:error, socket}
    end
  end

  def handle_local_problems_db_list(local_problems_list, socket)
  do
    if (local_problems_list === "none") do
      local_problems_list_safe = []
      {:ok, socket, local_problems_list_safe}
    else
      local_problems_list_safe = Enum.map(local_problems_list,
                                          fn(each_problem) -> Map.put(each_problem,"ListElement.element_title", LayertwoSanitize.SanitizeIo.escape_html_simple(each_problem["ListElement.element_title"])) end)
      local_problems_list_safe_including_is_author = Enum.map(local_problems_list_safe, fn(each_problem) -> if(each_problem["ListElementAuthor.entity_uuid"] === socket.assigns["entity_uuid"])
                                                                                                           do
                                                                                                            map_add_is_author = Map.put(each_problem,"ListElement.author", "true")
                                                                                                            Map.drop(map_add_is_author, ["ListElementAuthor.entity_uuid"])
                                                                                                           else
                                                                                                            map_add_is_author = Map.put(each_problem,"ListElement.author", "false")
                                                                                                            Map.drop(map_add_is_author, ["ListElementAuthor.entity_uuid"])
                                                                                                           end
                                                                                        end)
      {:ok, socket, local_problems_list_safe_including_is_author}
    end
  end

  def notify_entities(city_uuid, local_problem_latitude_float_valid, local_problem_longitude_float_valid, socket)
  do
    with {:ok, socket, notify_entities_list} <- LayertwoDb.ChannelCityLocalQueries.get_list_of_entities(city_uuid, local_problem_latitude_float_valid, local_problem_longitude_float_valid, socket),
         {:ok, socket} <- broadcast_new_local_problem_notification(notify_entities_list, socket)
    do
      {:ok, socket}
    else
      {:error, socket} -> {:error, socket}
    end
  end

  def notify_entities_update_local_problem(local_problem_uuid_safe,
                      local_problem_title_valid,
                      local_problem_importance_int_valid,
                      local_problem_description_valid,
                      local_problem_latitude_float_valid,
                      local_problem_longitude_float_valid,
                      local_problem_timestamp,
                      notify_entities_list,
                      previously_affected_entities_list,
                      socket)
  do
    with {:ok, socket, local_problem_title_valid_safe, local_problem_description_valid_safe} <- LayertwoSanitize.SanitizeIo.sanitize_local_problem_update(local_problem_title_valid, local_problem_description_valid, socket),
         {:ok, socket, notify_entities_list_update, notify_entities_list_create, notify_entities_list_delete } <- determine_lists_for_affected_entities(notify_entities_list, previously_affected_entities_list, socket),
         {:ok, socket} <- broadcast_local_problem_update_notifications(notify_entities_list_update,
                                                                       notify_entities_list_create,
                                                                       notify_entities_list_delete,
                                                                       local_problem_uuid_safe,
                                                                       local_problem_title_valid_safe,
                                                                       local_problem_importance_int_valid,
                                                                       local_problem_description_valid_safe,
                                                                       local_problem_latitude_float_valid,
                                                                       local_problem_longitude_float_valid,
                                                                       local_problem_timestamp,
                                                                       socket)
    do
      {:ok, socket}
    else
      {:error, socket} -> {:error, socket}
    end
  end

  def determine_lists_for_affected_entities(notify_entities_list, previously_affected_entities_list, socket)
  do
    notify_entities_list_update = Enum.filter(previously_affected_entities_list, fn(each_previous_entity) ->
                                    Enum.member?(notify_entities_list, each_previous_entity)
                                  end)

    notify_entities_list_create = Enum.filter(notify_entities_list, fn(each_new_entity) ->
                                    if(Enum.member?(previously_affected_entities_list, each_new_entity))
                                    do
                                      false
                                    else
                                      true
                                    end
                                  end)

    notify_entities_list_delete = Enum.filter(previously_affected_entities_list, fn(each_previous_entity) ->
                                    if(Enum.member?(notify_entities_list, each_previous_entity))
                                    do
                                      false
                                    else
                                      true
                                    end
                                  end)
    { :ok, socket, notify_entities_list_update, notify_entities_list_create, notify_entities_list_delete }
  end

  def broadcast_new_local_problem_notification(notify_entities_list, socket)
  do
    if(notify_entities_list !== "none")
    do
      Enum.map(notify_entities_list, fn(each_entity) -> LayertwoWeb.Endpoint.broadcast("l2_city_local:"<>each_entity["Entity.entity_ws_uuid"], "l2-city-local-update-problems-list", %{}) end)
      {:ok, socket}
    else
      {:ok, socket}
    end
  end

  def broadcast_local_problem_update_notifications(notify_entities_list_update,
                                                  notify_entities_list_create,
                                                  notify_entities_list_delete,
                                                  local_problem_uuid_safe,
                                                  local_problem_title_valid_safe,
                                                  local_problem_importance_int_valid,
                                                  local_problem_description_valid_safe,
                                                  local_problem_latitude_float_valid,
                                                  local_problem_longitude_float_valid,
                                                  local_problem_timestamp,
                                                  socket)
  do
      if(notify_entities_list_update !== [])
      do
        Enum.map(notify_entities_list_update, fn(each_entity) ->
          LayertwoWeb.Endpoint.broadcast("l2_city_local:"<>each_entity["Entity.entity_ws_uuid"],
                                         "l2-city-local-update-local-problem", %{"element_uuid" => local_problem_uuid_safe,
                                                                           "element_title" => local_problem_title_valid_safe,
                                                                           "element_importance" => local_problem_importance_int_valid,
                                                                           "element_description" => local_problem_description_valid_safe,
                                                                           "element_latitude" => local_problem_latitude_float_valid,
                                                                           "element_longitude" => local_problem_longitude_float_valid,
                                                                           "element_timestamp" => local_problem_timestamp}) end)
      end

      if(notify_entities_list_create !== [])
      do
        broadcast_new_local_problem_notification(notify_entities_list_create, socket)
      end

      if(notify_entities_list_delete !== [])
      do
        broadcast_local_problem_delete_notification(notify_entities_list_delete, local_problem_uuid_safe, socket)
      end

      {:ok, socket}
  end

  def broadcast_local_problem_delete_notification(notify_entities_list, local_problem_uuid, socket)
  do
    if(notify_entities_list !== "none")
    do
      Enum.map(notify_entities_list, fn(each_entity) -> LayertwoWeb.Endpoint.broadcast("l2_city_local:"<>each_entity["Entity.entity_ws_uuid"], "delete-element", %{"element_uuid" => local_problem_uuid}) end)
      {:ok, socket}
    else
      {:ok, socket}
    end
  end

end
