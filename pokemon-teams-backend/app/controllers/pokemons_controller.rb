class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serailized_json 
    end

    def create
        t = Trainer.find_by(id: params[:trainer])
        if t.pokemon.count < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: t.id)
        end
        render json: PokemonSerializer.new(pokemon).to_serailized_json 
    end
end
