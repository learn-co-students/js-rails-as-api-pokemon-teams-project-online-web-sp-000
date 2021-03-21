class Trainer < ApplicationRecord
    has_many :pokemons

    def addPokemonIfSpace
        if self.pokemons.length < 6
            nickname = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
        
            self.pokemons.create(nickname: nickname, species: species)
        end
    end
end
