class PokemonSerializer
  include FastJsonapi::ObjectSerializer
   belongs_to :trainer
    attributes :nickname, :species
end
