class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :pokemon_count_valid?

  private

  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:max_pokemon, "You can only have a maximum of 6 pokemon on your team.")
    end
  end
end
