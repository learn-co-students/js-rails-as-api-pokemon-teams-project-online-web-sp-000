require 'faker'

class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        Pokemon.create(nickname: name, species: species, trainer_id: params[:trainerId])
    end

    def destroy
        pokemon = Pokemon.find(params[:pokemonId])
        pokemon.destroy
    end

end
