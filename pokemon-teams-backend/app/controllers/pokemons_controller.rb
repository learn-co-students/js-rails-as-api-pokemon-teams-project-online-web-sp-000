class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params["trainer_id"])
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon)  
        pokemon.destroy      
    end 
end
