class Pokemon < ApplicationRecord

  belongs_to :trainer

  validate do
    count_valid?
  end

  private

  def count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_max, 'No more than 6 pokemon per trainer')
    end
  end

end
