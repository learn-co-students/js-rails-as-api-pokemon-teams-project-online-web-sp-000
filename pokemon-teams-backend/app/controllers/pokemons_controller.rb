class PokemonsController < ApplicationController

   def index
      pokemons = Pokemon.all

      # render json: birds, except: [:created_at, :updated_at]
      render json: pokemons.to_json(except: [:created_at, :updated_at])
   end

   def show
      pokemon = Pokemon.find_by(id: params[:id])

      if pokemon
         render json: { id: pokemon.id, name: pokemon.name}
      else
         render json: { message: 'Trainer not found' }
      end
   end

end
