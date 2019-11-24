class TrainersController < ApplicationController
  #trainer name and #
  ## nested with pokemon names and id
  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new( trainers ).to_serialized_json
  end

  def show
    trainer = Trainer.find_by_id( params[:id] )
    render json: TrainerSerializer.new( trainer ).to_serialized_json
  end

end
