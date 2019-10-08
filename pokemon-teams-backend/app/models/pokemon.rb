class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.createPokemonForTeam(trainer_id)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    trainer = Trainer.find(trainer_id)
    Pokemon.create(nickname: name, species: species, trainer: trainer)
  end
end
