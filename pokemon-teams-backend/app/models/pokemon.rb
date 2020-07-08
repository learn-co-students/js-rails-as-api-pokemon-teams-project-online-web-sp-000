class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate:pokemon_count_valid?






















  private

  def pokemon_count_valid?
    # counts a trainers maximum number of pokemon
    if self.trainer.pokemons.count >= 6
       self.errors.add(:team_max, " Alright Alright you got enough!🖕🏿" )

    end

  end

end
