require 'faker'

class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
                
        if trainer.pokemon.length < 6

          name = Faker::Name.first_name
          species = Faker::Games::Pokemon.name
          pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])

          render json: pokemon

        else

          render json: {message: "This team is full, release a pokemon before adding another."}

        end
    end

    def destroy
        render json: Pokemon.find(params[:id]).destroy
    end

end
