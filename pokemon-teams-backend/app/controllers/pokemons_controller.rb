class PokemonsController < ApplicationController
    require 'faker'

    def index
      pokemons = Pokemon.all
      render json: pokemons
    end
  
    def create
      pokemon = Pokemon.new(requireParams)
      pokemon.save
      render json: pokemon
    end
  
    def destroy
      pokemon = Pokemon.find(params[:id])
      pokemon.destroy
    end
  
    private
  
    def requireParams
      nickname = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      params.require(:pokemon).permit(:trainer_id).merge(nickname: nickname, species: species)
    end
  end
