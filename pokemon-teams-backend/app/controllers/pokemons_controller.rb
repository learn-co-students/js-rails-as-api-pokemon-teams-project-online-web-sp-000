class PokemonsController < ApplicationController
	def create
		trainer = Trainer.find(params[:trainer_id])
		
		if trainer.pokemons.count < 6
    	name = Faker::Name.first_name
	    species = Faker::Games::Pokemon.name
	    new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
			
			trainer.pokemons << new_pokemon

			redirect_to pokemon_path(new_pokemon)
		end
	end

	def show
		pokemon = Pokemon.find(params[:id])
		render json: PokemonSerializer.new(pokemon).to_serialized_json
	end

	def destroy
		pokemon = Pokemon.find(params[:id])
		pokemon.destroy
		render json: PokemonSerializer.new(pokemon).to_serialized_json
	end
end
