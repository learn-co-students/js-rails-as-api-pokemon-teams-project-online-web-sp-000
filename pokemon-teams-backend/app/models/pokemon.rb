class Pokemon < ApplicationRecord
  belongs_to :trainer, optional: true

  def self.create_with_fake_attrs(trainer_id)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    self.create(nickname: name, species: species, trainer_id: trainer_id)
  end
end
