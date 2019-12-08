class TrainersController < ApplicationController

    def index
        trainers = Trainers.all 
        render json: TrainerSerializer.new(trainers).to_serialized_json
    end

end
