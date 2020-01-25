class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        options = {include: [:pokemons]}
        render json: TrainerSerializer.new(trainers, options)
    end

    def show
        trainer = Trainer.find(params[:id])
        options = {include: [:pokemons]}
        render json: TrainerSerializer.new(trainer)
    end
end
