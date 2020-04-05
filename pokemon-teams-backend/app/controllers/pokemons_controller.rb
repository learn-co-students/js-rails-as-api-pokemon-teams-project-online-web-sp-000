class PokemonsController < ApplicationController
  def index
    trainer = Trainer.find_by(id: params[:trainer_id])
    pokemons = trainer.pokemons
    render json: pokemons.to_json
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: pokemon.to_json
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:pokemon_id])
    pokemon.destroy
    render json: pokemon.to_json
  end
end
