class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons], only: [:name]
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        render json: trainer, include: [:pokemons]
    end
end
