class PokemonsController < ApplicationController


  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name

    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])

    if pokemon.save

      render json: pokemon
    else

      render json: { message: "error" }
    end
  end

  def show
    p params
    pokemons = Pokemon.all.select {|poke| params[:id].to_i == poke.trainer_id}
    render json: PokemonSerializer.new(pokemons)
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
    pokemon.destroy
  end

  private

  def post_params
    params.permit(:id)
  end

end
