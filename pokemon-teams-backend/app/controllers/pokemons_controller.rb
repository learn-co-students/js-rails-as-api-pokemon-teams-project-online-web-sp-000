class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, only: [:id, :species, :name, :trainer_id]
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species:  Faker::Games::Pokemon.name
        })
        if pokemon.save
            render json: pokemon
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
end
