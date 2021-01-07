class PokemonSerializer

    def initialize(pokemon_object)
      @pokemon = pokemon_object
    end
  
    def to_serialized_json
      @pokemon.to_json()
    end
  
  end