class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers)
    end
end
