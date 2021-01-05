class TrainersController < ApplicationController

    def index 
        trainers = Trainer.all
    end
end
