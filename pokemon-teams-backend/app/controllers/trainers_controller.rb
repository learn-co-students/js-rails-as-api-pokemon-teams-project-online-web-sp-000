class TrainersController < ApplicationController
    def index
        trainers = Trainer.all 
        render json: TrainersSerializer.new(trainers).to_serialized_json
    end
end
