class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :pokemons
  has_many :pokemons
end
