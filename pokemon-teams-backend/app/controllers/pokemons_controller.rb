class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            render json: PokemonSerializer.new(pokemon)
        else
            render json: {message: "No pokemon found at that id."}
        end
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params["trainer_id"])
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        Pokemon.find_by(id: params[:id]).destroy
        render json: {"deleted_pokemon_id": "#{params[:id]}"}
    end
end
