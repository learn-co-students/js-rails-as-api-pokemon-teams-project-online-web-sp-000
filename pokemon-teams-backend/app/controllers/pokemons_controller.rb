class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.size < 6 
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    
            render json: PokemonSerializer.new(pokemon)
        else 
            render json: "Too many pokemon!"
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon
        render json: PokemonSerializer.new(pokemon)
    end

    

end
