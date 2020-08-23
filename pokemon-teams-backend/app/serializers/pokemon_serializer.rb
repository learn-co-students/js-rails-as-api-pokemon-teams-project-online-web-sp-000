class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :species, :nickname, :trainer_id
  belongs_to :trainer # this add trainer info to each pokemon object
  # {"id":35,"species":"Magikarp","nickname":"Esta","trainer_id":9,"trainer":{"id":9,"name":"Ashley"}}

  # {"id":35,"species":"Magikarp","nickname":"Esta","trainer_id":9}
end
