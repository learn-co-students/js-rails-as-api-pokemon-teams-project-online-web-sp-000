class PokemonsController < ApplicationController

    def index
        @pokemons = Pokemon.all
        render json: PokemonSerializer.new(@pokemons)
    end

    def create
        @pokemon = Pokemon.new(pokemon_params)
        if pokemon.save
            render json: PokemonSerializer.new(@pokemon), status: :accepted
        else
            render json: {errors: pokemon.errors.full_messages}, status: :unprocessible_entity
        end
    end

   
    def destroy
        @pokemon = Pokemon.find(params[:id])
        @pokemon.delete

        render json: {pokemonId: @pokemon.id}
    end



    private 
    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)    
    end
end
