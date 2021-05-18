class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :species, :nickname, :trainer_id
  belongs_to :trainer
  # def initialize(pokemon_object)
  #   @pokemon = pokemon_object
  # end

  # def to_serialized_json
  #   @pokemon.to_json(
  #     include: [:species, :nickname, :trainer_id],
  #     except: [:created_at, :updated_at]
  #   )
  # end
end