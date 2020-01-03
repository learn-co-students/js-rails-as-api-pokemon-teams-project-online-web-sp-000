class PokemonsController < ApplicationController
  #belongs_to :trainer
  def index
    allPokemon = Pokemon.all

    render json: allPokemon
  end
end
