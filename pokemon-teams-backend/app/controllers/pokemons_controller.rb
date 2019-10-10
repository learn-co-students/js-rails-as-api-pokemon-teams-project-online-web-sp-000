class PokemonsController < ApplicationController

    
    def create
        pokemon = Pokemon.new(
            nickname: Faker::Name.first_name, 
            species: Faker::Games::Pokemon.name, 
            trainer_id: params[:pokemon][:trainer_id])
        pokemon.save
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end
    
    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon.destroy).to_serialized_json
    end
end
