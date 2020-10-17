class PokemonsController < ApplicationController
    def index 
        pokemons = Pokemon.all 
        render :json => PokemonSerializer.new(pokemons).to_serialized_json
        # render :json => pokemons, only: [:nickname, :species, :trainer_id]
    end 
    
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params['trainer_id'])
        render :json => pokemon
    end 

    def destroy
        pokemon = Pokemon.find_by_id(params[:pokemon_id]).destroy 
        render :json => pokemon
    end 
end
