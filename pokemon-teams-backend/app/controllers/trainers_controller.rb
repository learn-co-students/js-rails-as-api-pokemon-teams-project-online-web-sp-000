class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    redirect_to '/test'
  end
end
