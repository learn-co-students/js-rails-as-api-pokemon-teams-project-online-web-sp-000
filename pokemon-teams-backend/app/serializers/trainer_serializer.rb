class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :pokemons
end
