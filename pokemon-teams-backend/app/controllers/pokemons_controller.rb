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

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon, except: [:created_at, :updated_at]
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        #render json: pokemon, except: [:created_at, :updated_at]
    end

end
