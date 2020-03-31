class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all 
        render json: pokemons, include: [:trainer]
    end 

    def create 
        pokemon = Pokemon.new(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name) 
        pokemon.trainer_id = params[:trainer_id]
        pokemon.save
        render json: pokemon, include: [:trainer]
    end 

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon, include: [:trainer]
    end 
end
