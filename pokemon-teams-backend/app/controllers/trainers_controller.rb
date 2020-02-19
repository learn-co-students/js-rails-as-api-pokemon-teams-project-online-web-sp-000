class TrainersController < ApplicationController
    def index
      trainers = Trainer.all
      render json: TrainerSerializer.new(trainers)
    end
  
    def show
      trainer = Trainer.find(params[:id])
      options = {include: [:pokemon]}
      render json: TrainerSerializer.new(trainer, options)
    end
  end