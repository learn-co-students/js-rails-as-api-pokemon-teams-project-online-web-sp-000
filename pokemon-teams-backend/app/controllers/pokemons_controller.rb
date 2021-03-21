class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find(params[:id])
    trainer.addPokemonIfSpace
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
  end
end
