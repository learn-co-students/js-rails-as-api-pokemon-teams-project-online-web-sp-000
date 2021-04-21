
class TrainerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id
    has_many :pokemons
  end