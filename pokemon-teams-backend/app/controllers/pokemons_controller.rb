class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def create
        trainer = Trainer.find_by(id: params['trainer_id'])
        if trainer.pokemons.count > 5
            render json: {data: "Too many pokemon"}
        else
            pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params['trainer_id'])
            render json: PokemonSerializer.new(pokemon)
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params['id'])
        pokemon.destroy
        render json: {data: params['id']}
    end
end
