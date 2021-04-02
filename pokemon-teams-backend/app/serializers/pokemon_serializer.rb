class PokemonsSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :nickname, :species, :trainer_id
end
