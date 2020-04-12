class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :nickname, :species
  belongs_to :trainer
end
