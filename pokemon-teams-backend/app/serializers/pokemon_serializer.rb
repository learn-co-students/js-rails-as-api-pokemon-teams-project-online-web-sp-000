class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :species, :nickname
  belongs_to :trainer

  # def initialize(pokemon_object)
  #   @pokemon = pokemon_object
  # end
  #
  # def to_serialized_json
  #   options = {
  #     only: [:id, :nickname, :species, :trainer_id]
  #   }
  #
  #   @pokeon.to_json(options)
  # end


  # def to_serialized_json
  #   @pokemon.to_json(:include => {
  #     :trainer => {:only => [:id, :name]}
  #   }, :only => [:id, :species, :nickname])
  # end
end
