class PokemonsController < ApplicationController
    def create
        
        id = params[:trainer_id]
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        poke = Pokemon.create(nickname: name, species: species, trainer_id: id)
        
    end

    def destroy
        poke = Pokemon.find_by(id: params[:id])
        poke.destroy
    end
end
