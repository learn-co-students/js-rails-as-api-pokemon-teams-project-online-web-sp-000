class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    pokemon = trainer.pokemons.create!(
      nickname: Faker::Name.name,
      species: Faker::Games::Pokemon.name
    )
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end
end