class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :species, :nickname
end
