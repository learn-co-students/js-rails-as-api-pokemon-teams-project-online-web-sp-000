class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
  end

  def create
    trainer = Trainer.find_by_id(params[:trainer_id])
    if trainer.pokemons.count < 6 then
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
      render json: PokemonSerializer.new(pokemon)
    else 
      render :json => {:error => "too many pokemons"}
    end
    
  end

  def show
    # byebug
    # render :json => {:message => "success"}
  end

  def destroy
    Pokemon.find_by_id(params[:id]).delete    
    render :json => {:message => "success"}
  end

  
end
