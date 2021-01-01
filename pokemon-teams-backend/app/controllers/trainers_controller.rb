class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        # render json: trainers 
        render json: TrainerSerializer.new(trainers)
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        # render json: trainer
        # render json: TrainerSerializer.new(trainer).serialized_json
        # render json: trainer, :include => {:pokemon => except: [:created_at, :updated_at]}
        render json: trainer.to_json(:include => {:pokemon => {:except => [:created_at, :updated_at]}}, :except => [:created_at, :updated_at])
    end
end
