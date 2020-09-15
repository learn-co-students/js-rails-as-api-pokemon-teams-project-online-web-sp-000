class TrainersController < ApplicationController

	before_action :find_trainer, only: [:show, :edit, :update, :destroy]

	def index
		trainers = Trainer.all
		render json: trainers, include: [:pokemons]
		# render json: TrainerSerializer.new(trainers)
	end

	def show
		trainer = Trainer.find_by(id: params[:id])
		render json: trainer, include: [:pokemons]
		# render json: TrainerSerializer.new(trainer)
	end

	def find_trainer
		@trainer = Trainer.find_by(id: params[:id])
	end

end
