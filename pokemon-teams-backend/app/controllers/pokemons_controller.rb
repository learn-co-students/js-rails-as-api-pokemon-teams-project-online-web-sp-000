class PokemonsController < ApplicationController
	def create
		trainer = Trainer.find(pokemon_params[:id_trainer])
		name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
		trainer.pokemons.build(nickname: name, species: species)
		trainer.save
		pokemon = trainer.pokemons.last
		render json: {
			id: pokemon[:id],
			nickname: pokemon[:nickname],
			species: pokemon[:species],
			id_trainer: trainer.id
		}
	end

	private

	def pokemon_params
		params.permit(:id_trainer)
	end
end
