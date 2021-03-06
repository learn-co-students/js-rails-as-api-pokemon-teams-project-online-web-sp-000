class PokemomSerializer < ActiveModel::Serializer
    attributes :id, :species, :nickame, :trainer_id
    belongs_to :trainer
end