class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers, except: [:created_at, :updated_at]
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer, except: [:created_at, :updated_at]
  end
end
