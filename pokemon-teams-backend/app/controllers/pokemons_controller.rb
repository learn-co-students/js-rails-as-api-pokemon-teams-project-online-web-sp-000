class PokemonsController < ApplicationController

    def create
        name = Faker::Name.name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id] )
        render json: pokemon.to_json(:except => [:created_at, :updated_at])
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:pokemon_id])
        pokemon.destroy

        render json: pokemon.to_json(:except => [:created_at, :updated_at])
    end
end
