class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end
    
      def create
        trainer = Trainer.find_by_id(params[:trainer_id])
        if trainer.pokemons.count < 6 
          name = Faker::Name.first_name
          species = Faker::Games::Pokemon.name
          pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        #   render json: PokemonSerializer.new(pokemon)
        render json: pokemon 
        else 
          render :json => {:error => "Maximum of 6 Pokemon per Team"}
        end
    end
    
    def delete 
        # byebug 
        Pokemon.find_by_id(params[:id]).delete    
        render :json => {:message => "success"}
    end
end
