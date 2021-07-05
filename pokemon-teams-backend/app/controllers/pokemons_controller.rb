class PokemonsController < ApplicationController

  def create
    trainer = Trainer.find(params[:trainer_id])
    if trainer.pokemons.length < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
      render json: pokemon
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:pokemon_id])
    render json: pokemon
    pokemon.destroy
  end

end
