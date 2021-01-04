class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers).to_serialized_json
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        if trainer
            render json: TrainerSerializer.new(trainer).to_serialized_json
        else
            render json: { message: 'Trainer not found' }
        end
    end

    def add_pokemon
        binding.pry
        if Trainer.find_by(params[:id]).pokemons.count < 6
            pokemon = Pokemon.new
            p.nickname = Faker::Name.first_name
            p.species = Faker::Games::Pokemon.name
        end
    end

    def remove_pokemon
        render json: Pokemon.find_by(params[:id]).destroy
    end
end
