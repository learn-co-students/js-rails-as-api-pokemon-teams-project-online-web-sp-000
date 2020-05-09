class PokemonsController < ApplicationController
    def create
        respond_with Pokemon.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name, trainer_id: params[:trainer_id])
    end

    def destroy
        respond_with Pokemon.destroy(params[:id])
    end
    private

    def pokemon_params
        params.require(:pokemon).permit(:species, :nickname, :trainer_id)
    end
end
