class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :nickname, :species, :trainer
  belongs_to :trainer
end
