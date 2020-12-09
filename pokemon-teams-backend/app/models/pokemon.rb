class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.random_pokemon(trainer)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  end
end
