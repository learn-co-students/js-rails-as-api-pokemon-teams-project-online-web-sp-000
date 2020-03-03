class PokemonsController < ApplicationController
	def index
		allPokemon = Pokemon.all
		render json: allPokemon
	end

	def new
		pokemon = Pokemon.new
		render json: pokemon
	end

	def create
		pokemon = Pokemon.new(message_params)
		if pokemon.save
		trainer = Trainer.find_by(trainer_id: params[:pokemons][:trainer_id])
		puts "trainer_id is #{trainer.id}."
		trainer.pokemons << pokemon
		render json: pokemon
		else
		render "Failed."
		end
	end

	def show
		pokemon = Pokemon.find_by(id: params[:id])

		render json: pokemon
	end

	def destroy
		pokemon = Pokemon.find_by(id: params[:id])
		pokemon.destroy    
	end

	private

	def message_params
		params.require(:pokemons).permit(:species, :nickname, :trainer_id)
	end
end
