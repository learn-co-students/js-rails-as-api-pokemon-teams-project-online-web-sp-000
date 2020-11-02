class TrainersController < ApplicationController
	def show
		trainer = Trainer.find(params[:id])
		render json: trainer, include: [pokemons: {only: [:id, :nickname, :species]}], only: [:name, :id]
	end

	def index
		trainers = Trainer.all
		render json: trainers, include: [pokemons: {only: [:id, :nickname, :species]}], only: [:name, :id]
	end
end