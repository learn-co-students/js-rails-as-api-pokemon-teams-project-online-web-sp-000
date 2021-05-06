class PokemonsController < ApplicationController

  def index
    pokemon = Pokemon.all
    render json: pokemon, only: %i[id nickname species], include: { trainer: { only: %i[id name] } }
  end

  def show
    pokemon = get_pokemon
    if pokemon
      render json: pokemon, only: %i[id nickname species], include: { trainer: { only: %i[id name] } }
    else
      render json: { message: 'No pokemon with that ID could be found.' }
    end
  end

  def create
    pokemon = Pokemon.new
    pokemon.nickname = Faker::Name.first_name
    pokemon.species = Faker::Games::Pokemon.name
    pokemon.trainer_id = params[:trainer_id]

    if Trainer.find_by(id: params[:trainer_id]).pokemon.size < 6
      pokemon.save
      redirect_to pokemon
    else
      head(:forbidden)
    end
  end

  def destroy
    pokemon = get_pokemon
    pokemon.destroy
  end

  private

  def get_pokemon
    Pokemon.find_by(id: params[:id])
  end

end
