class RemoveForeignKeyFromPokemon < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :pokemons, :trainers 
  end
end
