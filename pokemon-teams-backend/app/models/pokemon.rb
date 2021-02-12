class Pokemon < ApplicationRecord
  belongs_to :trainer, optional: true
  #this optional thing seems to be not working in console or controllers....
  #SQLite3::ConstraintException: NOT NULL constraint failed: pokemons.trainer_id
  #maybe its due to the table migration and not this...
  
end
