class PokemonsController < ApplicationController

    def create
        pokemon = Pokemon.create(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer: Trainer.find(params[:trainer_id])
        )
        render json: pokemon
    end

    def destroy 
        pokemon = Pokemon.find_by(id: params[:pokemon_id])
        pokemon.delete
        render json: pokemon
    end

end
