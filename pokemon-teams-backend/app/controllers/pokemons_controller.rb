class PokemonsController < ApplicationController
  def create
    
    
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    newbie = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    
    render json: PokemonSerializer.new(newbie)
end

  def destroy
  pokemon = Pokemon.find(params[:id])
  pokemon.delete
   render json: "Destroyed!"
  end

end
