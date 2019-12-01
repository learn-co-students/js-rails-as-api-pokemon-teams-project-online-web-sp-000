class PokemonsController < ApplicationController

  def create
    params_string = params["_json"]
    params = eval(params_string)
    trainer = Trainer.find(params[:trainer_id])
    if trainer.pokemon.length < 6
      nickname = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon= Pokemon.create(nickname: nickname, species: species, trainer_id: trainer.id)
      render json: PokemonSerializer.new(pokemon)
    else
      render json: {status: "error", code: 3000, message: "Too Many Pokemon"}
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
  end
end
