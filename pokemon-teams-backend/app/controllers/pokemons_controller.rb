class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        # puts params
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params["trainerId"])
        # puts pokemon
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
        Pokemon.destroy(params[:id])
    end
end
