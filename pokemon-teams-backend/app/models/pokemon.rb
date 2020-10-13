class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.generate_new(trainer_id)
    if Trainer.find(trainer_id).pokemons.count < 6
      new_pokemon = self.new
      new_pokemon.nickname = Faker::Name.first_name
      new_pokemon.species = Faker::Games::Pokemon.name
      new_pokemon.trainer_id = trainer_id
      new_pokemon.save
      new_pokemon
    end
  end
end
