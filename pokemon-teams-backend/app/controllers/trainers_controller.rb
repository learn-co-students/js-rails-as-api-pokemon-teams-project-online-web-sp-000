class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers.preload(:pokemon)).to_serialized_json
  end

end
