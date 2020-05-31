class PokemonsController < ApplicationController
    before_action :find_pokemon, only: [:show, :update]

    def index
        all_pokemon = Pokemon.all
        render json: create_json_for_pokemon(all_pokemon)
    end

    def unclaimed_index
        unclaimed_pokemon = Pokemon.where(trainer_id: 0)
        render json: create_json_for_pokemon(unclaimed_pokemon)
    end

    def show
        render json: create_json_for_pokemon(@pokemon)
    end

    def first_unclaimed
        first_unclaimed_pokemon = Pokemon.where(trainer_id: 0)[0]
        render json: create_json_for_pokemon(first_unclaimed_pokemon)
    end

    def create
        #new_pokemon = Pokemon.new(pokemon_params)
        new_pokemon = Pokemon.create_with_fake_attrs(pokemon_params)
        
        if new_pokemon.save
            render json: create_json_for_pokemon(new_pokemon)
        else
            render json: new_pokemon.errors#.full_messages #stringify needed?
        end
    end

    def update
        if @pokemon.update(pokemon_params)
            render json: create_json_for_pokemon(@pokemon)
        else
            render json: @pokemon.errors#.full_messages
        end
    end

    private

    def find_pokemon
        @pokemon = Pokemon.find_by(id: params[:id])
    end
    
    def pokemon_params
        params.require('pokemon').permit("name", "species", "trainer_id")
    end

    def create_json_for_pokemon(pokemon)
        pokemon.to_json(except: [:created_at, :updated_at])
    end
end
