class TrainersController < ApplicationController
    def index
        trainer = Trainer.all
        render json: trainer.to_json(:include => {
            :pokemons => {:only => [:nickname, :species, :id]}
        })
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        render json: trainer.to_json(:include => {
            :pokemons => {:only => [:nickname, :species, :id]}
        })
    end

end

# def show
#     sighting = Sighting.find_by(id: params[:id])
#     render json: sighting.to_json(:include => {
#       :bird => {:only => [:name, :species]},
#       :location => {:only => [:latitude, :longitude]}
#     }, :except => [:updated_at])
#   end

# #=> Example Request
# GET /trainers
 
# #=> Example Response
# [
#   {
#     "id":1,
#     "name":"Prince",
#     "pokemons":[
#       {
#         "id":140,
#         "nickname":"Jacey",
#         "species":"Kakuna",
#         "trainer_id":1
#       },
#       {
#         "id":141,
#         "nickname":"Zachariah",
#         "species":"Ditto",
#         "trainer_id":1
#       },
#       // ...
#     ]
#   }
#   // ...
# ]