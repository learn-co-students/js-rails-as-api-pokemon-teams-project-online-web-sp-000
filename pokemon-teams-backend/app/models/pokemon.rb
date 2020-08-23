class Pokemon < ApplicationRecord
  belongs_to :trainer
  
  validate :check_pokemon_count

  def check_pokemon_count
    if self.trainer.pokemons.count == 6
      self.errors.add(:count_msg, "You've max out on pokemons")
    end
  end
end
