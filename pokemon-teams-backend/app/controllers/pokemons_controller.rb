class PokemonsController < ApplicationController
    def index 
        @pokemons = Pokemon.all 
        render json: @pokemons
    end

    def create 
        @trainer = Trainer.find_by(id: params["trainer_id"])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        @pokemon = @trainer.pokemons.create(nickname: name, species: species)
        render json: @pokemon
    end 

    def destroy
        id = params["id"]
        @pokemon = Pokemon.find_by(id: id)
        @pokemon.destroy
        render json: @pokemon
    end
end
