class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers).to_serialized_json
    end
    
    def show
        trainer = Trainer.find(params[:id])
        options = {include: [:pokemon]}
        render json: TrainerSerializer.new(trainer).to_serialized_json
    end
end
