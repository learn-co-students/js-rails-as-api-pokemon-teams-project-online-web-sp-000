class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :nickname, :trainer_id, :species
  belongs_to :trainer
end
