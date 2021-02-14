require 'faker'

class PokemonsController < ApplicationController

	def index
    	pokemons = Pokemon.all
		render json: PokemonSerializer.new(pokemons).to_serialized_json
	end

	def create
		name1 = Faker::Name.first_name
    	species1 = Faker::Games::Pokemon.name
    	pokemon = Pokemon.create(nickname: name1, species: species1, trainer: Trainer.find(params[:trainer_id]))

    	render json: PokemonSerializer.new(pokemon).to_serialized_json
	end

	def destroy
		pokemon = Pokemon.find(params[:id])
		pokemon.destroy
	end

end

		# trainers = Trainer.all
		# render json: TrainerSerializer.new(trainers).to_serialized_json
