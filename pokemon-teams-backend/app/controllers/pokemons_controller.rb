class PokemonsController < ApplicationController


    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        received = params
        # binding.pry

        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name

        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:pokemon][:trainer_id])
        #not putting trainer_id throws everything into error. it wont even get to the next line binding.pry

        # binding.pry

        #i thought u can put a string or anything but for some reason it only accepts an object....
        #u can but u have to put .to_json, its not implicit anymore!
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        #NOT TESTED
        #must return teh delete thing....
        #dont use dup. ex: phrase2 = phrase1.dup
        #because a dup Pokemon instance will not have id... instead, create a ruby hash
        pokemon = Pokemon.find_by(id: params[:id])
        pokemonhash = { 
            id: pokemon.id,
            nickname: pokemon.nickname, 
            species: pokemon.species, 
            trainer_id: pokemon.trainer_id}
        pokemon.delete
        binding.pry
        render json: pokemonhash.to_json
    end
end
