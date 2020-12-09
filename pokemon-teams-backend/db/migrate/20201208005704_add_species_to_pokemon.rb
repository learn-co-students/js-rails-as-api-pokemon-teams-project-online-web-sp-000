class AddSpeciesToPokemon < ActiveRecord::Migration[6.0]
  def change
    rename_column :pokemons, :name, :nickname
    add_column :pokemons, :species, :string 
  end
end
