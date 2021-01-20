

  class TrainersController < ApplicationController

  def index
    @trainers = Trainer.all

    render json: @trainers.to_json
  end

end
