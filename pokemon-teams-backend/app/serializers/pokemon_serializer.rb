class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :species, :nickname
  belongs_to :trainer, if: -> _, params { params && params[:root] }
  set_key_transform :camel
end
