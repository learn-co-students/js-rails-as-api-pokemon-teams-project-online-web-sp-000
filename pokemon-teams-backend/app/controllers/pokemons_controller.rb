class PokemonsController < ApplicationController
  require 'faker'

  def index
    pokemon = Pokemon.all
    render json: pokemon
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
  end

  def new
  end

  def create
    #poke = Pokemon.new
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    poke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: poke
  end

  def destroy
    poke = Pokemon.find_by(id: params[:pokemon_id])
    json = poke.delete
    render json: json
  end
end
