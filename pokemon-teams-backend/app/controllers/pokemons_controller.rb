class PokemonsController < ApplicationController

  def create
    trainer = Trainer.find_by(id: pokemon_params[:trainer_id])
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name

    pokemon = trainer.pokemons.create(nickname: name, species: species)

    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy

    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:id, :trainer_id)
  end
end
