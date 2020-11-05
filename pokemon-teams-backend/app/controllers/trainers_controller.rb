class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    options = {
    include: [:name]
  }
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end
end
