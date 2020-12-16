class PokemonsController < ApplicationController
    def show 
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end 

    def index 
        pokemons = Pokemon.all 
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end 

    # pokemons/:id
    def create 
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build({
          nickname: Faker::Name.first_name,
          species:  Faker::Games::Pokemon.name
        })
    
        if pokemon.save
          render json: pokemon
        else
          render json: {message: pokemon.errors[:max_pokemon][0]}
        end
    end 

    # DELETE /pokemons/:id
    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end


end
