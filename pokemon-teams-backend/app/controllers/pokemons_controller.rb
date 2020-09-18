class PokemonsController < ApplicationController

  def create
    pokemon = Pokemon.new(
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name,
      trainer_id: params[:trainer_id]
    )
    if pokemon.save
      render json: pokemon
    else
      err = pokemon.errors.messages[:team_max][0]
      render json: { message: err }
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
  end

end
