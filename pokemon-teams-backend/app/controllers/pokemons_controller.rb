
class PokemonsController < ApplicationController
    def index
        @pokemons = Pokemon.all
        render json: @pokemons
      end
    def create
        
         #if there is a trainer
             #same as saying Trainer.find_by(id:2).pokemons.count < 6
                 #if there is no name
                 pokemon = Pokemon.new
                 pokemon.nickname = Faker::Name.first_name
                 pokemon.species = Faker::Games::Pokemon.name
                 pokemon.trainer = Trainer.find(params["trainer_id"])
                 pokemon.save
                 render json: PokemonSerializer.new(pokemon).to_serialized_json

        

        #this is one way of doing it. FOund it on github but it doesn't include serializer. It's actually quite understanable
        # pokemon = {} #we need to set up an empty object before we create a new pokemon
        # unless pokemon_params[:trainer_id].nil? #if there is a trainer
        #     if Trainer.find_by(pokemon_params[:trainer_id]).pokemons.count < 6 #same as saying Trainer.find_by(id:2).pokemons.count < 6
        #         if pokemon_params[:nickname].nil? #if there is no name
        #             pokemon_params[:nickname] = Faker::Name.first_name#create one
        #         end
        #         if pokemon_params[:species].nil? #if there is no species
        #             pokemon_params[:species] = Faker::Games::Pokemon.name#create one
        #         end
        #         @pokemon = Pokemon.create(pokemon_params.merge(pokemon)) #merge the two above
        #         render json: @pokemon
        #     else
        #         render json: { error: "no more pokemons allowed"}
        #     end
        # else
        #    render json: {"trainer not found"} #if there is not a trainer
        # end
    end
    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    #again, understandable solution. no need for private as well
    #     @pokemon = Pokemon.find(params[:id])
    #     unless @pokemon.nil?
    #       @pokemon.destroy
    #       render json: @pokemon
    #     else
    #       render json: { error: "Pokemon not Found!" }
    #     end
    #   end
    #private
    # def pokemon_params
    #     params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    # end
    end
   
end
