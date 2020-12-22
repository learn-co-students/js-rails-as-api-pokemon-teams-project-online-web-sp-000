class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json
    end

    def create
        trainer = Trainer.find_by(id: params[:trainerId])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)

        render json: pokemon
    end

    def delete
        pokemon = Pokemon.find_by(id: params[:pokemonId])
        pokemon.destroy
        render json: pokemon
    end
end
