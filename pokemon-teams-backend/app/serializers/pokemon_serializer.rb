class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :species, :nickname
  belongs_to :trainer
end
