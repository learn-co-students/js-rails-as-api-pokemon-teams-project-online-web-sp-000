class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
    end

    # creates new pokemon for specific trainer
    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        # info from faker gem
        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })

        # renders json pokemon if pokemon.save, else renders json message
        render json: pokemon.save ? pokemon : {message: pokemon.errors.messages[:team_max][0]}
    end

    def destroy

        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
end
