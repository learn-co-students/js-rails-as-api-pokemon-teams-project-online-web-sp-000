class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :limitedSpace, on: :create

  def limitedSpace
    if self.trainer.pokemons.size == 6
      errors.add(:team, "is limited to 6 pokemon")
    end
  end
end
