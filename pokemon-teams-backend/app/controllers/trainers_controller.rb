class TrainersController < ApplicationController
=begin    def index
        trainers = Trainer.all
        #render json: trainers
        options = {
            include: [:pokemons]
          }
        render json: TrainerSerializer.new(trainers, options)
    end
=end

    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons], except: [:created_at, :updated_at]
    end
end
