class PokemonsController < ApplicationController


  def destroy
    pokemon = Pokemon.find_by(params[:id])
    pokemon.destroy
    render json: {message: "pokemon released"}
  end
end
