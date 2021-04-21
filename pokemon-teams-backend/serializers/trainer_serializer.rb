class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :species, :nickname, :trainer_id
  has_many :pokemons
end
