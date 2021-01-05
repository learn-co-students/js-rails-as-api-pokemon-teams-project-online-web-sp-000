class Trainer < ApplicationRecord
    has_many :pokemons
    validate :pokemon_member_count, on: :update

    private 

    def pokemon_member_count 
        errors.add(:maxxed_out, "Too many Pokemon on your team") if self.pokemons.size > 6 
    end
end
