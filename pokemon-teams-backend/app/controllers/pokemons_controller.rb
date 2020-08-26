class PokemonsController < ApplicationController

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer.pokemons.size < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
      render json: pokemon
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: pokemon
  end
end
