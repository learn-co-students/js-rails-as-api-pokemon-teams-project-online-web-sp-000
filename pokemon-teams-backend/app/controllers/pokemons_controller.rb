class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    # teams = {}
    # pokemons.each do |poke|
    #   if teams.has_key?(teams[poke.trainer_id])
    #     teams[poke.trainer_id] << poke
    #   else
    #     teams[poke.trainer_id] = []
    #     teams[poke.trainer_id] << [poke]
    #   end

    # end
    # render json: teams

    render json: pokemons
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    id = params["trainer_id"]
    Pokemon.create(nickname: name, species: species, trainer_id: id)
  end

end
