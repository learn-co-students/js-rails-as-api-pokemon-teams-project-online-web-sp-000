class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :nickname, :species, :trainer_id
  belongs_to :trainer
end
