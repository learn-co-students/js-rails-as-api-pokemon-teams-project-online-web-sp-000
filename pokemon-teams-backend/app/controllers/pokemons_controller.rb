class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            render json: PokemonSerializer.new(pokemon)
        else
            render json: {message: "No pokemon found at that id."}
        end
    end
end
