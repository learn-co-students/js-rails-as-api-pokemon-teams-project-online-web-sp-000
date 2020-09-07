class TrainerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :pokemons
    has_many :pokemons
end