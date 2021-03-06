class PokemonsController < ApplicationController

    def index
        @pokemons = Pokemon.all
        render json: PokemonSerializer.new(@pokemons)
    end

    def show 
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })
        render json: pokemon.save ? pokemon : {message: pokemon.errors.messages[:team_max][0]}
    end

   
    def destroy
    #  binding.pry
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy

    #    render json: {pokemonId: @pokemon.id}
    render json: PokemonSerializer.new(pokemon).to_serialized_json

    end



    private 
    def pokemon_params
        params.require(:pokemon).permit(:id, :nickname, :species, :trainer_id)    
    end
end
