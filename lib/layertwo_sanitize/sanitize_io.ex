defmodule LayertwoSanitize.SanitizeIo do

  def check_if_empty(io_data_valid_string, socket) do
    if (String.length(io_data_valid_string) !== 0) do
      {:ok, socket}
    else
      {:error, socket}
    end
  end

  def check_if_string_valid(io_data, socket) do
    if (String.valid?(io_data) === true) do
      {:ok, socket, io_data}
    else
      {:error, socket}
    end
  end

  def escape_html_simple(io_data) do
    {:safe, io_data_safe} = Phoenix.HTML.html_escape(io_data)
    io_data_safe
  end

  def escape_html(io_data, socket) do
    {:safe, io_data_safe} = Phoenix.HTML.html_escape(io_data)
    {:ok, socket, io_data_safe}
  end

  def convert_importance_string_to_int(local_problem_importance, socket) do
    with {local_problem_importance_int, _} <- Integer.parse(local_problem_importance),
         {:ok, local_problem_importance_int_valid} <- check_if_importance_value_valid(local_problem_importance_int)
    do
      {:ok, socket, local_problem_importance_int_valid}
    else
      :error -> {:error, socket}
    end
  end

  def check_if_importance_value_valid(local_problem_importance_int) do
    if(local_problem_importance_int >=0 && local_problem_importance_int <= 4)
    do
      {:ok, local_problem_importance_int}
    else
      :error
    end
  end

  def convert_latitude_string_to_float(latitude_string, socket) do
    with {latitude_float, _} <- Float.parse(latitude_string),
         {latitude_float_short, _} <- Float.parse(:erlang.float_to_binary(latitude_float, decimals: 5)),
         {:ok, latitude_float_short_valid} <- check_if_latitude_valid(latitude_float_short)
    do
      {:ok, socket, latitude_float_short_valid}
    else
      :error -> {:error, socket}
    end
  end

  def check_if_latitude_valid(latitude_float_short) do
    if (latitude_float_short >= -90.0 && latitude_float_short <= 90.0) do
      {:ok, latitude_float_short}
    else
      :error
    end
  end

  def convert_longitude_string_to_float(longitude_string, socket) do
    with {longitude_float, _} <- Float.parse(longitude_string),
         {longitude_float_short, _} <- Float.parse(:erlang.float_to_binary(longitude_float, decimals: 5)),
         {:ok, longitude_float_short_valid} <- check_if_longitude_valid(longitude_float_short)
    do
      {:ok, socket, longitude_float_short_valid}
    else
      :error -> {:error, socket}
    end
  end

  def check_if_longitude_valid(longitude_float_short) do
    if (longitude_float_short >= -180.0 && longitude_float_short <= 180.0) do
      {:ok, longitude_float_short}
    else
      :error
    end
  end
end