class PokemonsController < ApplicationController
  def index
  end

  def show
  end

  def create
    pokemon = Pokemon.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name, trainer_id: params["trainerId"])
    render json: PokemonSerializer.new(pokemon)

    #post fetch and/or update the dom with that pokemon's nickname and species?
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.delete
  end
end
