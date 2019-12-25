class TrainersController < ApplicationController
  def show
    trainer = Trainer.find_by_id(params[:id])
    options = {
      include: [:pokemons]
    }
    render json: TrainerSerializer.new(trainer, options)
  end

  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers)
  end
end
