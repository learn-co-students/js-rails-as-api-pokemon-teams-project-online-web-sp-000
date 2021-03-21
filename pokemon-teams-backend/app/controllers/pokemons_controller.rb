class PokemonsController < ApplicationController
    require 'faker'
    def show
        pokemon = Pokemon.find(params[:id])
        if pokemon
            render json: pokemon.to_json
          else
            render json: { message: 'No sighting found with that id' }
        end
      end
      def index
        pokemons = Pokemon.all
        render json: pokemons.to_json
      end

      def create
        pokemon = Pokemon.new
        pokemon.nickname = Faker::Name.first_name 
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.trainer = Trainer.find(params[:trainer_id])
        pokemon.save
        redirect_to pokemon_path(pokemon)
      end

      def destroy
        Pokemon.find(params[:id]).destroy
        redirect_to pokemons_path, status: 303
      end

end
