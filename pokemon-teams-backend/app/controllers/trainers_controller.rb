class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    options = {
      include: [:pokemons, :'pokemons.nickname', :'pokemons.species'],
    }
    render json: TrainerSerializer.new(trainers, options)
  end
end
