class PokemonsController < ApplicationController
    def index 
        pokemons = Pokemon.all 
        render json: PokemonSerializer.new(pokemons)
    end

    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        options = {
            include: [:trainer]
        }
        render json: PokemonSerializer.new(pokemon, options)
    end

    def create 
        trainer = Trainer.find(params[:trainer_id])
        name = Fake::Name.first_name
        species = Fake::Games::Pokemon.name 
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon 
    end

    def destroy 
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end
end

        # pokemon = trainer.pokemons.build({
        #     nickname: Fake::Name.first_name,
        #     species: Faker::Games::Pokemon.name
        # })
