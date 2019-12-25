class PokemonsController < ApplicationController
  def create
    pokemon = Pokemon.new(
      trainer_id: params[:trainer_id],
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name)
    if pokemon.save
      render json: PokemonSerializer.new(pokemon, {params: {root: true}})
    else
      render status: 400
    end
  end
  def destroy
    pokemon = Pokemon.find_by_id(params[:id])
    pokemon.destroy
    if pokemon.destroyed?
      render json: PokemonSerializer.new(pokemon)
    else
      render json: {message: "Something done fucked up"}
    end
  end
end
