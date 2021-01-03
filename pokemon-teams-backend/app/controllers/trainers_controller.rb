class TrainersController < ApplicationController
   def index
    trainers = Trainer.all
    render json: trainers, include: [:pokemons]
   end

   def show
    trainer = Trainer.find(params[:id])
    render json: trainer, include: [:pokemons]
   end

end
