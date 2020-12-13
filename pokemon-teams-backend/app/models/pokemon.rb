class Pokemon < ApplicationRecord

    belongs_to :trainer

    validate :pokemon_count_valid?
    
    private

    def pokemon_count_valid?
        if self.trainer.pokemons.count >= 6
            self.errors.add(:team_full, "There can't be more than 6 Pokemon on a team")
        end     
    end
end
