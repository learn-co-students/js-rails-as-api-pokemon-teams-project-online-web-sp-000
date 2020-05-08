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
    trainer = Trainer.find(params[:trainer_id])
    pokemon = trainer.pokemons.build({
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name
    })
    if pokemon.save 
      render json: PokemonSerializer.new(pokemon, options)
    else
      render json: pokemon.errors.messages[:team_max][0]
    end
  end

  def destroy 
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
  end

end
