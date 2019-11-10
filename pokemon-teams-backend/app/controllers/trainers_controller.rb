class TrainersController < ApplicationController

    def index
        trainers = Trainer.all 
        
        render json: trainers.to_json( :include => {
            :pokemons => { :only => [:id, :nickname, :species, :trainer_id]}
        }, :except => [:updated_at])
    end

end
