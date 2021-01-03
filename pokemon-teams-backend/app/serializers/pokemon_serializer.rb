class PokemonSerializer < ActiveModel::Serializer
    attributes :id, :species, :nickname, :trainer_id
    has_many :trainer 
end