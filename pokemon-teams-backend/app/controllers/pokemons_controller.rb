class PokemonsController < ApplicationController

     def index
          pokemons = Pokemon.all
          render json: pokemons
     end

     def show 
          pokemon = Pokemon.find(params[:id])
          render json: pokemon
     end

     def create
          trainer = Trainer.find(params[:trainer_id])
          pokemon = trainer.pokemons.build ({
               # render json: pokemon({
               nickname: Faker::Name.first_name,
               species: Faker::Games::Pokemon.name
          })
          if pokemon.save 
               render json: pokemon 
          else 
               {message: "YIPPEE" }

     end
end

     def destroy
          pokemon = Pokemon.find(params[:id])
          pokemon.destroy
     end
end
