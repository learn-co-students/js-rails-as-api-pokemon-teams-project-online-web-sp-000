class PokemonsController < ApplicationController

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    pokemon = Pokemon.random_pokemon(trainer)
    render json: pokemon
    #create model method to generate random pokemon
  end


  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: {message: "pokemon released"}
  end
end
