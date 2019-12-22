class PokemonsController < ApplicationController
    
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        name = Faker::Name.first_name
        species = Faker:Games.Pokemon.name
        new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:pokemonId])
        render json: PokemonSerializer.new(pokemon)
        Pokemon.destroy(params[:pokemonId])
    end

end

# with options when relationships are set in ObjectSerializer

  # def index
  #   pokemons = Pokemon.all
  #   options = {
  #     include: [:trainer]
  #   }
  #   render json: PokemonSerializer.new(pokemons, options)
  # end
  #
  # def show
  #   pokemon = Pokemon.find_by(id: params[:id])
  #   options = {
  #     include: [:trainer]
  #   }
  #   render json: PokemonSerializer.new(pokemon, options)
  # end
