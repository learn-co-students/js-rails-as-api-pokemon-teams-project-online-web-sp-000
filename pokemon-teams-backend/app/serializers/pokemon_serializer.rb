class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nickname, :species, :trainer
  belongs_to :trainer
end
