class TrainersController < ApplicationController


  def index
    trainers = Trainer.all

    render json:
    # BackendSerializer.new(trainers).to_serialized_json
    trainers, include:[:pokemons]

  end

  def show
    trainer = Trainer.find(params[:id])
    render json:
    trainer, include:[:pokemons]

  end

  def new

  end

  def delete

  end


end
