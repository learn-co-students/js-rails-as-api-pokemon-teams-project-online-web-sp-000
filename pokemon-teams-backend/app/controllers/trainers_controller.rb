class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers)
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        if trainer
            render json: TrainerSerializer.new(trainer)
        else
            render json: {message: "No trainer found at that id."}
        end
    end
end
