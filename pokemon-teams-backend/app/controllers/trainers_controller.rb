class TrainersController < ApplicationController
  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: TrainerSerializer.new(trainer).to_serialized_json
  end

  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end
end