defmodule LayerTwoDbTest do
  use ExUnit.Case
  doctest LayerTwoDb

  test "greets the world" do
    assert LayerTwoDb.hello() == :world
  end
end
