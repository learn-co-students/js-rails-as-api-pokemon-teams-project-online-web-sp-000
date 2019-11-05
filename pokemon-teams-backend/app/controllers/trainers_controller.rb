class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
        # options = {
        #     include: [:pokemons]
        # }
        # render json: TrainerSerializer.new(trainers, options)
    end
end
