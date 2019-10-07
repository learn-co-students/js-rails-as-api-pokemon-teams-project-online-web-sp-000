class PokemonsController < ApplicationController

    require 'faker'
    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon, only: [:id, :nickname, :species, :trainer_id]
    end


    def index
        pokemons = Pokemon.all 
        options = {
            include: [:trainer]
          }
        render json: pokemons, only: [:id, :species, :nickname], 
        include: {
            trainer: {only: [:id, :name]}
        }    
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon, only: [:id, :nickname, :species, :trainer_id]
    end

end
