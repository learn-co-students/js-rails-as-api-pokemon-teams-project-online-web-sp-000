class PokemonSerializer 
    def initialize(pokemon_object)
        @pokemons = pokemon_object 
    end 

    def to_serialized_json 
        options = {:only => [:nickname, :species, :trainer_id]}
        @pokemons.to_json(options)
    end 
end 