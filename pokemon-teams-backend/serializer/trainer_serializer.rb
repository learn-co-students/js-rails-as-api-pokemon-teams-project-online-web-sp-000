class TrainerSerializer < ActiveModel::Serializer
  attributes :id, :nickname, :species, :trainer_id
  has_many :pokemons
end
