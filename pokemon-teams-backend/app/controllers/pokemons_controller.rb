class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end
end
