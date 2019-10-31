class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new( pokemons ).to_serialized_json
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    new_poke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: PokemonSerializer.new( new_poke ).to_serialized_json
  end

  def destroy
    pokemon = Pokemon.find_by_id( params[:id] )
    destroyed_pokemon = pokemon.delete
    render json: PokemonSerializer.new( destroyed_pokemon ).to_serialized_json
  end

end
