class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        # options = {
        #     include: [:pokemon]
        # }
        render json: TrainerSerializer.new(trainers)
    end
end
