class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :species, :nickname, :trainer_id
end
