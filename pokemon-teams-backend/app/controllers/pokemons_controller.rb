class PokemonsController < ApplicationController

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    id = ''
    Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  end

  def delete
    pokemon = Pokemon.find_by(id: [params[:id]])
    pokemon.destroy
  end

end
