class PokemonsController < ApplicationController
  def create  
    trainer = Trainer.find(params[:id])
    if trainer.pokemon.count < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:id])
      render json: PokemonSerializer.new(pokemon).to_serialized_json
    end
  end
  
  def destroy
    pokemon = Pokemon.find(params[:id])
    poke_json = PokemonSerializer.new(pokemon)
    pokemon.destroy
    render json: poke_json.to_serialized_json
  end
end
