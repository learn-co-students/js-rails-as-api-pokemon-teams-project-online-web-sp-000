class TrainersController < ApplicationController
  #has_many :pokemons
  def index
    trainers = Trainer.all

    render json: trainers, include: [:pokemons]
  end

  def show
    trainer = Trainer.find_by(params[:id])
    render json: trainer, include: [:pokemons]
  end

  
end
