class TrainersController < ApplicationController

   def index
      trainers = Trainer.all

      # render json: birds, except: [:created_at, :updated_at]
      # render json: trainers.to_json(except: [:created_at, :updated_at])

      # after adding trainer serializer
      render json: TrainerSerializer.new(trainers).to_serialized_json
   end

   def show
      trainer = Trainer.find_by(id: params[:id])

      if trainer
         render json: { id: trainer.id, name: trainer.name}
      else
         render json: { message: 'Trainer not found' }
      end
   end

end
