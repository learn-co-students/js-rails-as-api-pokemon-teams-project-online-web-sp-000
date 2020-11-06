class PokemonsController < ApplicationController

  def show
    pokemon = Pokemon.find_by_id(params[:id])
    render json: pokemon 
  end
  
  
  def create
    trainer = Trainer.find(params[:trainer_id])
    
    if trainer.pokemons.count < 6
      nickname = Faker::Name.first_name
      species = Faker::Name.first_name
      pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: params[:trainer_id])
      render json: pokemon, status: 201
    else
      render json: {message: "A team can only have 6 pokemon. Please release 1."}
    end
  end
  
  def destroy
    pokemon = Pokemon.find_by_id(params[:id])
    pokemon.destroy
    render json: pokemon
  end

end

  