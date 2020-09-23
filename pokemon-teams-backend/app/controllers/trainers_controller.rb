class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers.to_json(:include => {
            :pokemons => {:only => [:nickname, :species, :id]}
        })
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer
    end
end
