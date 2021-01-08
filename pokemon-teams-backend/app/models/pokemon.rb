class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :pokemon_count_valid?
  private 

  def pokemon_count_valid? 
    if self.trainer.pokemons.count > 6
      self.errors.add(:team_max, "Oops! You already have 6 Pokemon; release one to add another.")
    end
  end
end
