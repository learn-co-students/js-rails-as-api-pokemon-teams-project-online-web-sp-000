class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, include: :trainer
    end

    def create
        name, species = Faker::Name.first_name, Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: pokemon, include: :trainer
    end
end
