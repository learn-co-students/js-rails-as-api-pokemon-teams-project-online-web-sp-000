class PokemonsController < ApplicationController
  def index
    pokemon = Pokemon.all
    render json: pokemon
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
  end
end
