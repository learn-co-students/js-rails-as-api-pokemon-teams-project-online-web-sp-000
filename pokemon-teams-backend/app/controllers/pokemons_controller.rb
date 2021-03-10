
require 'faker'

class PokemonsController < ApplicationController
    
    def index
        pokemons = Pokemon.all
        render json:PokemonSerializer.new(pokemons).to_serialized_json
      end
     
      def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json:PokemonSerializer.new(pokemon).to_serialized_json
      end
      
      def create 
        pokemon = Pokemon.create(
          nickname: Faker::Name.first_name,
          species: Faker::Games::Pokemon.name,
          trainer: Trainer.find(params[:trainer_id])
        )
        render json:PokemonSerializer.new(pokemon).to_serialized_json
      end

      def destroy
       id =  params[:id]
       pokemon = Pokemon.find(id)
       pokemon.delete
        # redirect_to 'trainers'
      end
end
