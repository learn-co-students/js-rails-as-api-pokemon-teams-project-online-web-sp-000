class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

end
