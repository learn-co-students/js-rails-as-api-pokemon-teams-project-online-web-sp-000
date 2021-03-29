class PokemonsController < ApplicationController
    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.destroy
    end 

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        poke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: poke, except: [:created_at, :updated_at]
    end 

    def show 
        pokemon = Pokemon.find_by_id(params[:id])
        render json: pokemon, except: [:created_at, :updated_at]
    end 
end
