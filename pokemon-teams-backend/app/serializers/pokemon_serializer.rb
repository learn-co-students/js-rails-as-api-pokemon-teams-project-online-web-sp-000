class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :nickname, :species, :trainer_id, :trainer
  belongs_to :trainer
end
