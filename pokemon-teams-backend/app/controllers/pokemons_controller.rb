class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find(params[:id])
    pokemon_name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    new_pokemon = trainer.pokemons.build(:nickname => pokemon_name, :species => species)
    new_pokemon.save
    render json: PokemonSerializer.new(new_pokemon).to_serialized_json
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    trainer = pokemon.trainer
    pokemon.destroy
    render json: TrainerSerializer.new(trainer).to_serialized_json
  end

end
