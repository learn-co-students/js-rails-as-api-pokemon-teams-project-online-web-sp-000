class CreatePokemons < ActiveRecord::Migrations 
    def change 
        create_table :pokemons do |t|
            t.string :species 
            t.string :nickname 
            t.references :trainer, foreign_key: true    
        end 
    end 
end 