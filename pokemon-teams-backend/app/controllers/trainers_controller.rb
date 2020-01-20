class TrainersController < ApplicationController
  #has_many :pokemons
  def index
    trainers = Trainer.all

    render json: trainers, include: [:pokemons]
  end

  def show
    trainer = Trainer.find_by(params[:id])
    render json: trainer, include: [:pokemons]
  end

  def create
    @pokemon = Pokemon.new(params[:pokemon])

    if @pokemon.save
      respond_to do |format|
        format.json{render :json => @pokemon, :status => :created, :location => @pokemon }
      end
    end
  end
end
