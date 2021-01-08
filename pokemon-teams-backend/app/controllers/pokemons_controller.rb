class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def show 
        pokemon = Pokemon.find_by(params[:id])
        render json: pokemon, except: [:created_at, :updated_at]
    end

    def create 
        trainer = Trainer.find_by(params[:trainer_id])
        binding.pry
        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })
        render json: pokemon.save ? pokemon : {message: pokemon.errors.messages[:team_max][0]}
    end

    def destroy 
        pokemon = Pokemon.find_by(params[:id])
        pokemon.destroy
    end
end
