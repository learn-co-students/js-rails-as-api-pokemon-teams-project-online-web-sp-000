class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all 
        render json: trainers.to_json(:include => {
            :pokemons => {:only => [:id, :species, :nickname, :trainer_id]}
        })
    end 

    def show 
        trainer = Trainer.find_by(id: params[:id])
        render json: trainer.to_json(:include => {
            :pokemons => {:only => [:id, :species, :nickname, :trainer_id]}
        })
    end 
end
