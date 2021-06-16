class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, except: [:created_at, :updated_at]
=begin        options = {
            include: [:trainer]
          }
        render json: PokemonSerializer.new(pokemons, options)
    end
=end
    end
end
