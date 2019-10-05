class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :species, :nickname, :trainer
end
