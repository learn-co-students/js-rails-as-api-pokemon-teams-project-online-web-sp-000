require 'faker'
class PokemonsController < ApplicationController

    def create

        @pokemon = Pokemon.create(
            nickname: Faker::Name.name,
            species: Faker::Games::Pokemon.name,
            trainer_id: params[:trainer_id]
        )
        render json: @pokemon
    end

    def destroy
        @pokemon = Pokemon.find(params[:id])
        unless @pokemon.nil?
            @pokemon.destroy
            render json: @pokemon
        else
            render json: { error: "Pokemon not Found!" }
        end
    end

    private
    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end