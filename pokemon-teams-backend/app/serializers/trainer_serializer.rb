class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  has_many :pokemons
  attributes :name, :pokemons
end
