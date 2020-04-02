class TrainersController < ApplicationController
 
    def index 
    @trainers = Trainer.all
    render json: @trainers
   end 

   def show 
    @trainer = Trainer.find(params[:id])
    render json: @trainer
    #  only:[:id, :name], include:{pokemons: {only:[:id, :species, :nickname]}}
   end 
end 
