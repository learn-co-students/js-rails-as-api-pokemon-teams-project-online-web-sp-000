class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :species, :nickname, :trainer_id
  belongs_to :trainer
end
