class PokemonsController < ApplicationController
  def create
    
    
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    newbie = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    
    render json: PokemonSerializer.new(newbie)
end

  def destroy
  
  end

end
