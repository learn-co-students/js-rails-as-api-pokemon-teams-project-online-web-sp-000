class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        
        render json: TrainerSerializer.new(trainers)
    end
    def show
        trainer = Trainer.find(params[:id])
        render json: TrainerSerializer.new(trainer)
    end
end
