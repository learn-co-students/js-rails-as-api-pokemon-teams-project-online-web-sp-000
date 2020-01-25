class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        )
        trainer.save
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        pokemon = Pokemon.find(params[:pokemon_id])
        pokemon.delete
        render json: PokemonSerializer.new(pokemon)
    end
end
