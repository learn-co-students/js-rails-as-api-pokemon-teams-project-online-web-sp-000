class PokemonsController < ApplicationController


def create

    pokemon = Pokemon.new

    pokemon.trainer_id = params[:trainer_id]
    pokemon.species = Faker::Games::Pokemon.name
    pokemon.nickname = Faker::Name.first_name

    pokemon.save

    render json: PokemonSerializer.new(pokemon)
end



def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
end

end
