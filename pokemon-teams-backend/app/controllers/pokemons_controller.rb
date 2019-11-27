class PokemonsController < ApplicationController

  def index
    pokemons=Pokemon.all

    render json: pokemons
  end

  def show
    pokemon=Pokemon.find(params[:id])
    render json: pokemon
  end

  def create
    pokemons_size=Trainer.find(params[:pokemon][:trainer_id]).pokemons.length

    if pokemons_size<6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      params[:pokemon][:nickname]=name
      params[:pokemon][:species]=species
      pokemon=Pokemon.create(pokemon_params)
      render json: pokemon
    else
      render json: { error: "Team is complete!"}, status: 403
    end

  end

  def destroy
    pokemon=Pokemon.find(params[:id])
    pokemon.destroy
    render json: pokemon
  end

  def pokemon_params
      params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
