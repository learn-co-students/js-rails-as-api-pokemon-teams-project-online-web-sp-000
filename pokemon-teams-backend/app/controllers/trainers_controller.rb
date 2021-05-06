class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: trainers, only: %i[id name], include: { pokemon: { only: %i[id nickname species] } }
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    if trainer
      render json: trainer, only: %i[id name], include: { pokemon: { only: %i[id nickname species] } }
    else
      render json: { message: 'No trainer with that ID could be found.' }
    end
  end
end
