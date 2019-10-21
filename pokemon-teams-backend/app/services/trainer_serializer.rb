class TrainerSerializer

   def initialize(trainer_object)
      @trainer = trainer_object
   end

   # whatever you pass when initializing a new instance of SightingSerializer
   # will be stored as @trainer.

   # You will need to access to this variable elsewhere in the SightingSerializer,
   # so an instance variable is needed here.

   # The second step is to write a method
   # that will call to_json on this instance variable,
   # handling the inclusion and exclusion of attributes, and return the results.

   # You will call this method to_serialized_json,
   # and for now you can directly copy the to_json logic
   # that currently exists in SightingsController:

   def to_serialized_json

      # @trainer.to_json(:include => {
      #    :pokemons => {:only => [:species, :nickname]},
      # }, :except => [:updated_at])

      options = {
         include: {
            pokemons: {
               only: [:species, :nickname]
            }
         },
         except: [:updated_at],
      }

      @trainer.to_json(options)
   end

end
