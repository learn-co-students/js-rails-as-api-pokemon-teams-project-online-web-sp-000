class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    id = params["trainer_id"]
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: id)
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end
end
