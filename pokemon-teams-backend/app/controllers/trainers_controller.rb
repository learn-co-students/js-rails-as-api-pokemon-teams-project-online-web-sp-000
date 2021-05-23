class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all
        render json: trainers.to_json(:include => {
            :pokemon => {:only => [:id, :nickname, :species, :trainer_id]} 
        }, :except => [:updated_at, :created_at])
    end
end
