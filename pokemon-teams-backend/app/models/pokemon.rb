class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do
    pokemon_count_valid?
  end

  private

  def pokemon_count_valid?
    if self.trainer.pokemons.count > 5
      self.errors.add(:team_max, "You can't have more than six.")
    end
  end
end
