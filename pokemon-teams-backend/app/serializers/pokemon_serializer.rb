class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :trainer
  attributes :trainer, :nickname, :species
end
