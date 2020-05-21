class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :species, :nickname, :trainer_id
  belongs_to :trainer
end
