require 'securerandom'

class PokemonsController < ApplicationController
    def create 
        trainer = Trainer.find(params[:trainerId])
        new_pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
        if trainer.pokemons.size <= 5
            trainer.pokemons << new_pokemon
            render json: new_pokemon, only: [:id, :nickname, :species], 
                include: { trainer: {only: [:id, :name]}
            }
        end 
    end

    def destroy 
        pokemon = Pokemon.find(params[:pokemonId])
        pokemon.destroy 
        render json: pokemon, only: [:id, :nickname, :species],
            include: {
                trainer: {only: [:id, :name]}
        }
    end
end
