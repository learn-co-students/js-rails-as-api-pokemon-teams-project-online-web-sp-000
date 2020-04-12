class PokemonsController < ApplicationController
  def show
    pokemon = Pokemon.find(params[:id])
    render json: PokemonSerializer.new(pokemon)
  end

  def create
    pokemon = Trainer.find(params[trainer_id]).pokemons.build
    pokemon.name = Faker::Name
    pokemon.species = Faker::Games::Pokemon
    pokemon.save
    render json: PokemonSerializer.new(pokemon)
end
