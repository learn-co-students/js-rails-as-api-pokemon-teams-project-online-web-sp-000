class PokemonsController < ApplicationController

    def create
     name = Faker::Name.first_name
     species = Faker::Games::Pokemon.name
     poke = Pokemon.create(nickname: name, species: species)
     
     
    end

   

end
