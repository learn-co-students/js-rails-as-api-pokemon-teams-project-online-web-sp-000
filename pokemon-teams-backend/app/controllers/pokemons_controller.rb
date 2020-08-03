class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainerId])
        if Trainer.find_by(id: params[:trainerId]).pokemons.length < 6
            render json: {id: pokemon.id, nickname: pokemon.nickname, species: pokemon.species}
        else
            render json: {message: "Sorry, this trainer can't have more pokemons."}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:pokemonId])
        pokemon.trainer.pokemons.destroy(pokemon)
        render json: {id: pokemon.id, nickname: pokemon.nickname, species: pokemon.species}
    end
end
