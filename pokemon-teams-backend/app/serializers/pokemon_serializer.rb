class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :trainer
  attributes :id, :species, :nickname, :trainer_id
end
