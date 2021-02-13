class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
  end

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer.pokemons.count < 6
      pokemon = trainer.pokemons.build({
        nickname = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
      })
      render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end
end
