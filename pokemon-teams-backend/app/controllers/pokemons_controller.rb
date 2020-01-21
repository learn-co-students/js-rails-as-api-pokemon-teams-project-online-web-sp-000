class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        if Trainer.find(pokemon_params[:trainer_id]).pokemons.length < 6
          pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
          render json: pokemon, status: 201
        else
          render json: { error: "Party is Full!"}, status: 403
        end
      end
      
      def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon
      end
  
      private
  
      def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
      end  
end
