class PokemonsController < ApplicationController
  def create
    new_pokemon = Pokemon.generate_new(params["trainer_id"])
    render json: PokemonSerializer.new(new_pokemon).to_serialized_json
  end

  def destroy
    dead_pokemon = Pokemon.find(params["id"])
    render json: PokemonSerializer.new(dead_pokemon).to_serialized_json
    Pokemon.destroy(dead_pokemon.id)
  end
end


# name = Faker::Name.first_name
# species = Faker::Games::Pokemon.name
