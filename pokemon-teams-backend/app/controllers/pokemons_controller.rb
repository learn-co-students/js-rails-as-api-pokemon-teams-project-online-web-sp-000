class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer && trainer.pokemons.length < 6
            nickname = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: trainer.id)
            render json: PokemonSerializer.new(pokemon).to_serialized_json
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            render json: PokemonSerializer.new(pokemon).to_serialized_json
            pokemon.destroy
        end
    end
end
