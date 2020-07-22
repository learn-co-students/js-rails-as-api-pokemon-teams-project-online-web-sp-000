class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def new 
    end

    def create 
        trainer = Trainer.find_by(id: params['trainer_id'])
        if trainer.pokemons.count < 6 
            nickname = Faker::Name.first_name
            species = Faker::Games::Pokemon.name 
            pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: trainer.id)
            render json: PokemonSerializer.new(pokemon)
        else 
            render json: { status: 'error', message: "Can only hold 6 Pokemon"}
        end
    end


end
