class PokemonsController < ApplicationController
  def show
    pokemon = Pokemon.find(params[:id])
    render json: PokemonSerializer.new(pokemon)
  end
end
