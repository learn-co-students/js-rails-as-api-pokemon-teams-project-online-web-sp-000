class PokemonsController < ApplicationController
  def create
    new_pokemon = Pokemon.new
    new_pokemon.nickname = Faker::Name.first_name
    new_pokemon.species = Faker::Games::Pokemon.name
    new_pokemon.trainer_id = params[:id]
    new_pokemon.save
    render json: PokemonSerializer.new(new_pokemon).to_serialized_json
  end
end


# name = Faker::Name.first_name
# species = Faker::Games::Pokemon.name
