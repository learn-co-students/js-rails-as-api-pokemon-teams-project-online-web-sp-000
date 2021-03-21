class TrainersController < ApplicationController
    def show
        trainer = Trainer.find(params[:id])
        if trainer
            render json: trainer.to_json
          else
            render json: { message: 'No sighting found with that id' }
        end
      end
      def index
        trainers = Trainer.all
        render json: trainers.to_json
      end
end
