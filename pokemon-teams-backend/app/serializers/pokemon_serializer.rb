class PokemonSerializer
  # include FastJsonapi::ObjectSerializer
  # attributes :nickname, :species, :trainer
  # belongs_to :trainer


  def initialize(pokemon_object)
    @pokemon = pokemon_object
  end

  def to_serialized_json
    @pokemon.to_json()
  end

end
