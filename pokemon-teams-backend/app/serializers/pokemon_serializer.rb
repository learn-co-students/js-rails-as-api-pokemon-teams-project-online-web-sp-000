class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nickname, :species, :trainer_id
  belongs_to :trainer
end
