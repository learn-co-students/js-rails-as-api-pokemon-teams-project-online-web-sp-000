class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nickname, :species 
  belongs_to :trainer
end
