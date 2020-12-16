class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate :valid_pokemon_count

  private

  def valid_pokemon_count
    if self.trainer.pokemons.count >= 6
      self.errors.add(:max_pokemon, "You can only have a maximum of 6 pokemon on your team.")
    end
  end

end
