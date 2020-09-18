class PokemonsController < ApplicationController


    def create 
        render json: PokemonSerializer.new(pokemon)

    end

    def destroy
    end 




end
