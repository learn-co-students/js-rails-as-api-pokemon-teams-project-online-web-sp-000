class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attribute :name
  has_many :pokemons
  set_key_transform :camel
end
