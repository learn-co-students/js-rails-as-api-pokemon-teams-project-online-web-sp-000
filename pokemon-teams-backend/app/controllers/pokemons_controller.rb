class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemons.count < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
           pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)    
           render json: PokemonSerializer.new(pokemon)
        end
    end

    def destroy
       
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
      
    end
end
