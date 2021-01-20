class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons

    end

    def show
        pokemon = Pokemon.find_by_id(params[:id])
        render json: pokemon

    end

    def create
        trainer = Trainer.find_by_id(params[:trainer_id])
        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })
        render json: (pokemon.save) ? pokemon : {message: pokemon.errors.messages[:team_max][0]}
           
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.destroy

    end

end
