class PokemonsController < ApplicationController

    def new
        pokemon = Pokemon.new
        pokemon.nickname = Faker::Name.nickname
        pokemon.species = Faker::Games::Pokemon.species
        if trainer.pokemon.count < 6
            pokemon.save
        end
        render json: pokemons, include: [:nickname, :species, :trainer_id]
    end

    def delete

    end

end
