class PokemonSerializer
  def initialize(o)
    @pokemon = o
  end
  def to_serialized_json
    options = {
          only: [:id, :nickname, :species, :trainer_id]
    }
    @pokemon.to_json(options)
  end
end
