class PokemonsController < ApplicationController
  def new
    #byebug
    trainer = Trainer.find(params[:_json])
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    render json: pokemon, except: [:created_at, :updated_at]
  end
  def destroy
    poke = Pokemon.find(params[:_json])
    name = poke.nickname
    poke.destroy
    render json: {message: "#{name} released"}
  end
end
