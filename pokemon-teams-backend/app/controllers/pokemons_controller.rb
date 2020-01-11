class PokemonsController < ApplicationController
    def index
        pokemon = Pokemon.all
        render json: pokemon
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        Pokemon.destroy(params[:id])
    end

    def create
        trainer = Trainer.find_by_id(params[:id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon
    end

end

