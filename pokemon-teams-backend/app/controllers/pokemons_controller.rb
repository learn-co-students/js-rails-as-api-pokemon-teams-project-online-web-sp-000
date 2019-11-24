class PokemonsController < ApplicationController

  def create
    pokemon = Pokemon.new(trainer_id: params[:trainer_id], nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
    if pokemon.save
      render json: pokemon
    else
      render status: 400
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id]).destroy
    if pokemon.destroyed?
      render json: pokemon
    else
      render status: 400
    end
  end

end
