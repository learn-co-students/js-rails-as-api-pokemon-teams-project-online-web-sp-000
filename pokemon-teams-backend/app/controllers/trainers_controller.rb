class TrainersController < ApplicationController
  #has_many :pokemons
  def index
    trainers = Trainer.all

    render json: trainers, include: [:pokemons]
  end

  def show
  end

  def create
    
  end
end
