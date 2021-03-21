class TrainersController < ApplicationController
    def show
        trainer = Trainer.find(params[:id])
        options = {
          include: [:pokemons]
        }
        render json: TrainerSerializer.new(trainer, options)
    end

    def index
        trainers = Trainer.all
        options = {
          include: [:pokemons]
        }
        render json: TrainerSerializer.new(trainers, options)
    end
end