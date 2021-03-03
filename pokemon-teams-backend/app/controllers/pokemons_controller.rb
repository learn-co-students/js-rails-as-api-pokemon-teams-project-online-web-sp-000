class PokemonsController < ApplicationController

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name 
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])

    # render json: PokemonSerializer.new(pokemon).to_serialized_json
    render json: pokemon.to_json(except: [:created_at, :updated_at])
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end
end
