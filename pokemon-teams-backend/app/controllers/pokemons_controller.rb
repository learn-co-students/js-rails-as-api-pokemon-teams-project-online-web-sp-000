class PokemonsController < ApplicationController

    # def index
    #     pokemons = Pokemon.all
    #     options = {
    #         include: [:trainer]
    #     }
        
    #     render json: PokemonSerializer.new(pokemons, options)
    # end

    def index
        pokemons = Pokemon.all       
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        
        if pokemon
            render json: PokemonSerializer.new(pokemon).to_serialized_json
        else
            render json: { message: 'Pokemon not found' }
        end
    end

    def create
        # binding.pry
        # trainer_id = params["trainer-id"]
        # name = Faker::Name.first_name
        # species = Faker::Games::Pokemon.name
        # Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        # binding.pry
    end

    def destroy
    end
    
end
