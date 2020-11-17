class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        options = {
            include: [:trainer]
        }
        render json: PokemonSerializer.new(pokemons, options)
    end

    def create
        pokemon = Pokemon.create(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer: Trainer.find(params[:trainer_id])
        )
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
end
