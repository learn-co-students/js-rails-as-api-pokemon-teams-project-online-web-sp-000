class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        options = {
            include: [:pokemons]
        }
        render json: TrainerSerializer.new(trainers, options)
    end
end
