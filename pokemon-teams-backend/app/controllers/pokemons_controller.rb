class PokemonsController < ApplicationController
  def show
    pokemon = Pokemon.find(params[:id])
    render json: PokemonSerializer.new(pokemon)
  end

  def create
    pokemon = Trainer.find(params['trainer_id']).pokemons.build
    pokemon.nickname = Faker::Name.first_name
    pokemon.species = Faker::Games::Pokemon.name
    pokemon.save
    render json: PokemonSerializer.new(pokemon)
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy 
  end
end
