class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate do
    pokemon_count_valid?
  end

  private
  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.all(:team_max, "Hey don't get greedy! The maximum number of pokemons is 6.")

    end
  end
end