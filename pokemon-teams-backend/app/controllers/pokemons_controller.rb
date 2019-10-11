class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end
    
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def destroy
        pokemon = Pokemon.find(params[:pokemon_id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
        pokemon.destroy
    end
end
