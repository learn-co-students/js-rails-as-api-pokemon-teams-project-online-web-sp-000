class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all 
        render json: TrainerSerializer.new(trainers)
    end

    def show 
        trainer = Trainer.find_by(id: params[:id])
        render json: trainer.to_json(:include => {
            :pokemons => {:only => [:species, :nickname]}
        }, :except => [:updated_at, :created_at]) 
    end
end
