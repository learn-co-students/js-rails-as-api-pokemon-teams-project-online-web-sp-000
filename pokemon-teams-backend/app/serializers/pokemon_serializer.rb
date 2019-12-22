class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nickname, :species
end
