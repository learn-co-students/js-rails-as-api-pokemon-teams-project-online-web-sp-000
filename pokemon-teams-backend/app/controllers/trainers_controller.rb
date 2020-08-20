class TrainersController < ApplicationController
    def show
        trainers = Trainer.find(params[:id])
        render json: trainers, include: [:pokemons]
    end
    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
    end
end
