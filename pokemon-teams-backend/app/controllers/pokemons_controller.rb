class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])

        trainer = Trainer.find_by_id(params[:trainer_id])

        if (trainer.pokemons.count < 6)
            pokemon.save(nickname: name, species: species, trainer_id: params[:trainer_id])
            render json: PokemonSerializer.new(pokemon)
        else
         
            render json: {status: "error", message: "Can't have more than 6 Pokemon on your team!"}
        end       
    end

    def destroy
    
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        #render json: PokemonSerializer.new(pokemon)   
    end
end