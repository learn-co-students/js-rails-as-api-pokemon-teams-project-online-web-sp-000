class TrainersController < ApplicationController
    def index
        trainers = Trainer.all

        # This is a user-created custom JSON render 
        # Present data efficiently but will try 'fast_jsonapi' gem for practice
        # render json: trainers, include: {pokemons: {only: [:nickname, :species]}}, except: [:created_at, :updated_at]

        # This is custom JSON render through 'fast_jsonapi' gem
        # Do not include options hash including pokemons since we are also rendering the pokemons under a separate controller
        # options = { include: [:pokemons] }
        render json: TrainerSerializer.new(trainers)
    end
end
