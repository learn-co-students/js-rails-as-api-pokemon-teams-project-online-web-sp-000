class PokemonsController < ApplicationController

    def index 
    @pokemons = Pokemon.all
    render json: @pokemons
    end 
  
    def show 
   
    @pokemon = Pokemon.find(params[:id])
    render json: @pokemon

    end

    def create 
@trainer = Trainer.find(params[:trainer_id])
if @trainer.pokemons.length < 6
@pokemon = @trainer.pokemons.build({
    nickname: Faker::Name.first_name,
    species:  Faker::Games::Pokemon.name
 })
@pokemon.save
render json: @pokemon
else  
    render json: {message:"This trainer already has 6 pokemons!"}
end 

    end 
end 
