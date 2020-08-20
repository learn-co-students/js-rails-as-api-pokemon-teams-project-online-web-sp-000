class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find_by(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end
end
