class TrainersController < ApplicationController
    # def index
    #     trainers = Trainer.all
    #     options = {
    #         include: [:pokemons]
    #     }
    #     render json: TrainerSerializer.new(trainers, options)
    # end

    # Probably don't need fast json api gem with code below
    # Could extract code below into a service class
    def index
        trainers = Trainer.all
        render json: trainers, only: [:id, :name],
          include: { pokemons: {only: [:id, :nickname, :species]}
        }
    end

    def show 
        trainer = Trainer.find_by(id: params[:id])
        render json: trainer, only: [:id, :name],
            include: { pokemons: {only: [:id, :nickname, :species]}
        }
    end

    # def create 
    #     binding.pry
    # end
end
