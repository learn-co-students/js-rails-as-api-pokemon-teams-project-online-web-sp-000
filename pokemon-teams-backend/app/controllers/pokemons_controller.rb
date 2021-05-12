class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = Pokemon.new
        if trainer.pokemons.count < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        end
        render json: pokemon.to_json
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id]).delete
        render json: pokemon.to_json
    end

end
