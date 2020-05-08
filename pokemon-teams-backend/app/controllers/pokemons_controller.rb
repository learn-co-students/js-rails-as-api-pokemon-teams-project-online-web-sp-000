class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
  end

  def show
    pokemon = Pokemon.find(params[:id])
    options = {
      include: [:trainer]
    }
    render json: PokemonSerializer.new(pokemon, options)
  end

  def create 
    binding.pry
  # trainer_collection.each do |trainer|
  #   team_size = (SecureRandom.random_number(6) + 1).floor
    
  #   (1..team_size).each do |poke|
  #     name = Faker::Name.first_name
  #     species = Faker::Games::Pokemon.name
  #     Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  #   end
  end

  def destroy 
    binding.pry
  end

end
