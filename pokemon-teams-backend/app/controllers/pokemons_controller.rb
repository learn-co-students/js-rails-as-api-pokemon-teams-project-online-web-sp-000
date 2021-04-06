class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        options = {include: [:trainer]}
        render json: PokemonSerializer.new(pokemons, options)
    end
    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        options = {include: [:trainer]}
        render json: PokemonSerializer.new(pokemon, options)
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer])

        if trainer.pokemons.count < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
            options = {include: [:trainer]}
            render json: PokemonSerializer.new(pokemon, options)
        end
    end

    def destroy
        render json: Pokemon.find_by(id: params[:id]).destroy
    end
    

    # // trainer_collection.each do |trainer|
    #     //   team_size = (SecureRandom.random_number(6) + 1).floor
         
    #     //   (1..team_size).each do |poke|
    #     //     name = Faker::Name.first_name
    #     //     species = Faker::Games::Pokemon.name
    #     //     Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    #     //   end
    #     // end
    
end
