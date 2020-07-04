class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do
    pokemon_amount_valid?
  end

  private

  def pokemon_amount_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_max, "You have plenty of pokemon!")
    end
  end
end
