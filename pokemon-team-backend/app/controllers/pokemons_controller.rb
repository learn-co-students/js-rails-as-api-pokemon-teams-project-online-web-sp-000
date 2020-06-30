class PokemonsController < ApplicationController

  def create
    pokemon = Pokemon.new()
    pokemon.species = Faker::Games::Pokemon.name
    pokemon.nickname = Faker::Name.first_name
    pokemon.trainer_id = params["trainerId"]
    pokemon.save
    render json: pokemon
  end

  def destroy
    Pokemon.find_by(id: params[:id]).destroy
  end
end
