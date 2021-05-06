class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :species, :nickname, :trainer
  belongs_to :trainer
end
