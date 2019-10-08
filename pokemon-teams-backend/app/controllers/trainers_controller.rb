class TrainersController < ApplicationController

  #trying serializaiton --
  # def index
  #   trainers = Trainer.all
  #   # render json: TrainerSerializer.new(trainers).to_serialized_json
  #   render json: TrainerSerializer.new(trainers)
  #
  # end


  ##########################################################################
  #--- Works but doesn't filter on pokemon attributes
  # def index
  #     trainers = Trainer.all
  #     render json: trainers, only: [:name, :id], include: :pokemons
  # end

  # --- produces same final result - without serializaiton
  def index
    trainers = Trainer.all
    render json: trainers, only: [:id, :name],
      include: { pokemons: {only: [:id, :nickname, :species, :trainer_id]}
    }
  end

end
