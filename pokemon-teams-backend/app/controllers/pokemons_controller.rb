class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all

    render json: pokemons, except: [:created_at, :updated_at]
  end
  
  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    
    render json: pokemon, except: [:created_at, :updated_at]
  end
  
  def create
    trainer_id = params[:trainer_id]
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)

    render json: pokemon, except: [:created_at, :updated_at]
  end
end
