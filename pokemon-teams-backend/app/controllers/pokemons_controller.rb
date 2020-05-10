class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params["pokemon"]["traianer_id"])
        if trainer.pokemon.count >= 6
            render json: {error: "Party is Full!"}, status: 403
        else
            pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)
            render json: pokemon, status: 200
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        unless pokemin.nil?
            pokemon.destroy
            render json: pokemon
        else
            render json: {error: "Pokemon not Found!"}, status: 404
        end
    end
end
