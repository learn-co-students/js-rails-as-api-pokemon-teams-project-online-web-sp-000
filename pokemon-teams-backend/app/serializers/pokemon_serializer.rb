class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nickname, :species 
  #belongs_to :trainer 
end

# t.string "species"
# t.string "nickname"
# t.integer "trainer_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["trainer_id"], name: "index_pokemons_on_trainer_id"

