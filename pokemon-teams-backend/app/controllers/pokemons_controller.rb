class PokemonsController < ApplicationController
    def index 
        pokemons = Pokemon.all
        render json: pokemons.to_json
    end 

    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon.to_json
    end

    def new 
        
    end 

    def create 
        #get trainer here and work on association between pokemon and trainer
        
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = Pokemon.all.sample
        pokemon.trainer_id = trainer.id
        
        render json: pokemon.to_json
    end
   
    def random 
        pokemon = Pokemon.all.sample
        #pokemon = Pokemon.order('RANDOM()').first
        render json: pokemon
    end 

    def destroy 
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
    end 

end

