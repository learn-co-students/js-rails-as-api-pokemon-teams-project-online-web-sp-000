class PokemonsController < ApplicationController
    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy()
    end

    def create
        trainer = Trainer.find(params[:trainer_id])

        if trainer.pokemons.count < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
            render json: pokemon 
        end

    end
end
