class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
  end

  def show
    pokemon = Pokemon.find(params[:id])
    options = {
      include: [:id, :species, :nickname, :trainer_id]
    }
    render json: PokemonSerializer.new(pokemon, options)
  end
end
