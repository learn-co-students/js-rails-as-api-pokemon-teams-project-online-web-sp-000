class PokemonsController < ApplicationController

	before_action :find_pokemon, only: [:edit, :update, :destroy]

	def index
		pokemons = Pokemon.all
		render json: PokemonSerializer.new(pokemons)
	end

	def show
		pokemon = Pokemon.find_by(id: params[:id])
		render json: PokemonSerializer.new(pokemon)
	end

	def find_pokemon
		@pokemon = Pokemon.find_by(id: params[:id])
	end

end
