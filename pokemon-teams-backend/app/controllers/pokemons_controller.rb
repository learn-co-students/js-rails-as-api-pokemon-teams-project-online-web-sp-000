class PokemonsController < ApplicationController

  def create
    trainer = params[:trainer_id]
    Pokemon.random_pokemon(trainer)
    render json: pokemon
    #create model method to generate random pokemon
  end


  def destroy
    pokemon = Pokemon.find_by(params[:id])
    pokemon.destroy
    render json: {message: "pokemon released"}
  end
end
