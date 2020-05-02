class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    options = {
      include: [:pokemons]
    }
    render json: trainers, only: [:id, :name], include: {
      pokemons: {only: [:id, :nickname, :species, :trainer_id]}
      }
  end
end
