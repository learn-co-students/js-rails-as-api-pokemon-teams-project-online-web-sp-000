class PokemonSerializer
  def initialize(pokemon_object)
    @pokemon = pokemon_object
  end

  def to_serialized_json
    options = {
      only: [:id, :nickname, :species, :pokemon_id]
    }
    @pokemon.to_json(options)
  end
end
