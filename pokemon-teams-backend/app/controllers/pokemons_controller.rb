class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find(params[:id])
    pokemon_name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    trainer.pokemons.build(:nickname => pokemon_name, :species => species)
    render json: TrainerSerializer.new(trainer).to_serialized_json
  end
end
