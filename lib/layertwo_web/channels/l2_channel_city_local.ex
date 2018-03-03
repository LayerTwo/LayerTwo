defmodule LayertwoWeb.L2ChannelCityLocal do
  use LayertwoWeb, :channel


  def join("l2_city_local:" <> entity_ws_uuid, _message, socket) do
    with {:ok, socket} <- LayertwoAuth.ChannelAuth.check_if_city_local_channel_allowed(entity_ws_uuid, socket)
         do
         {:ok, socket}
         else
         {:error, _socket} -> {:error, "Access Denied!"}
         end
  end


  def handle_in("l2_city_local_problem_form_data_submit", 
                %{"problem_title" => local_problem_title,
                "problem_importance" => local_problem_importance, 
                "problem_description" => local_problem_description, 
                "problem_latitude" => local_problem_latitude, 
                "problem_longitude" => local_problem_longitude}, 
                socket) 
    do
    with {:ok, socket, local_problem_title_valid} <- check_if_local_problem_title_valid(local_problem_title, socket),
         {:ok, socket, local_problem_description_valid} <- check_if_local_problem_description_valid(local_problem_description, socket),    
         {:ok, socket, local_problem_importance_int_valid} <-LayertwoSanitize.SanitizeIo.convert_importance_string_to_int(local_problem_importance, socket),
         {:ok, socket, local_problem_latitude_float_valid} <- LayertwoSanitize.SanitizeIo.convert_latitude_string_to_float(local_problem_latitude, socket),
         {:ok, socket, local_problem_longitude_float_valid} <- LayertwoSanitize.SanitizeIo.convert_longitude_string_to_float(local_problem_longitude, socket),
         {:ok, socket} <- check_if_local_problem_location_valid(local_problem_latitude_float_valid, local_problem_longitude_float_valid, socket),
         {:ok, socket, city_uuid} <- LayertwoDb.ChannelCityLocalQueries.save_local_problem_db(local_problem_title_valid, 
                                                                                              local_problem_importance_int_valid,
                                                                                              local_problem_description_valid,
                                                                                              local_problem_latitude_float_valid, 
                                                                                              local_problem_longitude_float_valid, 
                                                                                              socket),
         {:ok, socket} <- notify_entities(city_uuid, local_problem_latitude_float_valid, local_problem_longitude_float_valid, socket)
    do
      {:reply, :ok, socket}
    else
      {:error, socket} -> {:reply, :error, socket}
    end
  end


  def handle_in("l2-city-local-list-problems-init-data-request", %{}, socket) do
    with {:ok, socket, local_problems_init_list} <- LayertwoDb.ChannelCityLocalQueries.get_entity_init_local_problems(socket),
         {:ok, socket, local_problems_init_list_safe} <- handle_local_problems_init_db_list(local_problems_init_list, socket)
    do
      push socket, "l2-city-local-problems-init-list", %{"local_problems_init_list" => local_problems_init_list_safe}
      {:noreply, socket}
    else
      {:error, socket} -> {:error, socket}
    end
    
  end
  
  def handle_in("city-local-problem-description-request", %{"local_problem_uuid" => local_problem_uuid}, socket ) do
    with {:ok, socket, db_entity_latitude, db_entity_longitude} <- LayertwoDb.ChannelCityLocalQueries.get_entity_latitude_longitude(socket),
         {:ok, socket, db_local_problem_latitude, db_local_problem_longitude} <- LayertwoDb.ChannelCityLocalQueries.get_local_problem_latitude_longitude(local_problem_uuid, socket),
         {:ok, socket} <- check_city_local_problem_range_valid(db_local_problem_latitude, 
                                                               db_local_problem_longitude, 
                                                               db_entity_latitude, 
                                                               db_entity_longitude, 
                                                               socket),
         {:ok, socket, db_local_problem_description} <- LayertwoDb.ChannelCityLocalQueries.get_local_problem_description(local_problem_uuid, socket),
         {:ok, socket, local_problem_description_safe} <- LayertwoSanitize.SanitizeIo.escape_html(db_local_problem_description, socket)
    do
      push socket, "l2-city-local-db-problem-description", %{"local_problem_uuid" => local_problem_uuid, "local_problem_description" => local_problem_description_safe}
      {:noreply, socket}
    else
    {:error, socket} -> {:noreply, socket}
    end
  end

  def handle_in(_arg, %{}, socket) do
    {:noreply, socket}
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

  def handle_local_problems_init_db_list(local_problems_init_list, socket) do
    if (local_problems_init_list === "none") do
      local_problems_init_list_safe = []
      {:ok, socket, local_problems_init_list_safe}
    else
      local_problems_init_list_safe = Enum.map(local_problems_init_list, fn(each_problem) -> Map.put(each_problem,"LocalProblem.local_problem_title", LayertwoSanitize.SanitizeIo.escape_html_simple(each_problem["LocalProblem.local_problem_title"])) end)
      {:ok, socket, local_problems_init_list_safe}
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

  def broadcast_new_local_problem_notification(notify_entities_list, socket) do
    if(notify_entities_list !== "none") 
    do
      Enum.map(notify_entities_list, fn(each_entity) -> LayertwoWeb.Endpoint.broadcast("l2_city_local:"<>each_entity["Entity.entity_ws_uuid"], "l2-city-local-update-problems-list", %{}) end)
      {:ok, socket}
    else
      {:ok, socket}
    end
  end
  
end
