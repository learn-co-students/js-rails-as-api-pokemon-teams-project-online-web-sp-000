require 'faker'

class PokemonsController < ApplicationController
    def index
        @pokemons = Pokemon.all 
        render json: PokemonSerializer.new(@pokemons)
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        @pokemon = Pokemon.new(species:species, nickname:name, trainer_id:params[:trainer_id])
        if @pokemon.save 
            render json: PokemonSerializer.new(@pokemon)
        else  
            render json: {message: 'Pokemon not saved'}
        end 
    end

    def show
        if find_pokemon
            render json: PokemonSerializer.new(@pokemon)
        else  
            render json: {message: 'Pokemon not found'}
        end
    end

    def update
        find_pokemon 
        @pokemon.update(trainer_id:params[:trainer_id])
        render json: {message: 'Pokemon successfully updated'}
    end

    def destroy
        find_pokemon
        @pokemon.destroy
        render json: {message: 'Pokemon successfully destroyed'}
    end

    private

    def find_pokemon
        @pokemon = Pokemon.find_by(id:params[:id])
    end
end
