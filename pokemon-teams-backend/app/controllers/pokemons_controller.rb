#require 'pry'

class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, include: [:trainer]
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon, include: [:trainer]
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })
        if pokemon.save
            render json: pokemon, include: [:trainer]
        else
            render json: {message: pokemon.errors.messages[:team_max]}
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
end
