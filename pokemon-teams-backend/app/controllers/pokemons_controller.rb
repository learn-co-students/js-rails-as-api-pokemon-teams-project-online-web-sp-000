class PokemonsController < ApplicationController
  #belongs_to :trainer
  def index
    allPokemon = Pokemon.all

    render json: allPokemon
  end

  def new
    pokemon = Pokemon.new
  end

  def create
    #params[:pokemons] = {species: params[:species], nickname: params[:nickname], trainer_id: params[:trainer_id]}
    pokemon = Pokemon.new(params[:pokemons])
    if pokemon.save

      trainer = Trainer.find_by(params["pokemons"]["trainer_id"])
        trainer.pokemons << @pokemon
        #respond_to do |format|
        #  format.json{render :json => @pokemon, :status => :created, :location => @pokemon }
        #end
      #render pokemon
    end

  end

  def show
    @pokemon = Pokemon.find_by(params[:id])

    render json: @pokemon
  end



  private

   def message_params
      params.require(:pokemons).permit(:species, :nickname, :trainer_id)
   end


end
