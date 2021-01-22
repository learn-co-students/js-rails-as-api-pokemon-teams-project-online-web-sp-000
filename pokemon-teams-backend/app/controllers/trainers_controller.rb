class TrainersController < ApplicationController


def index
    trainers = Trainer.all
    options = {include: [:pokemons]}

    render json: TrainerSerializer.new(trainers, options)
end

def show
    trainer = Trainer.find_by(id: params[:id])
    options = {include: [:pokemons]}

    render json: TrainerSerializer.new(trainer, options)

end

end
