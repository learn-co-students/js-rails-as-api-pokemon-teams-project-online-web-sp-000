class PokemonSerializer

  def initialize(pokemon_obj)
    @pokemon = pokemon_obj
  end

  def to_serialized_json
    @pokemon.to_json(except: [:created_at, :updated_at])
  end
end