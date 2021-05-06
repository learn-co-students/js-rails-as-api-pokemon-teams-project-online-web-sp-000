class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :species, :nickname, :trainer_id
  belongs_to :trainer
end
