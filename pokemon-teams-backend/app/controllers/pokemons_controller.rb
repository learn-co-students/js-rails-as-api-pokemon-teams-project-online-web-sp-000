class PokemonsController < ApplicationController
    def index
        trainer = Trainer.find(params[:trainer_id])
        pokemons = trainer.pokemons
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def create
        nickname = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        
        trainer = Trainer.find(params[:trainer_id])
        
        pokemon = trainer.pokemons.build(nickname: nickname, species: species)
        pokemon.save
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
end
