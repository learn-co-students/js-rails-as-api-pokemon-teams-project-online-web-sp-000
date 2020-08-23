class TrainersController < ApplicationController

    def show
        trainer = Trainer.find_by(id: params[:id])

        render json: trainer
    end

    def index
        trainers = Trainer.all
        # render json: trainers,  include: [:pokemons], except: [:created_at, :updated_at]
        
        # render json: trainers.to_json(:include => {:pokemons => {only: [:id, :species, :nickname, :trainer_id]}}, :except => [:created_at, :updated_at])

        # render json: TrainerSerializer.new(trainers).to_json_serializer     # from class services serializer
        
        render json: trainers
    end
end
