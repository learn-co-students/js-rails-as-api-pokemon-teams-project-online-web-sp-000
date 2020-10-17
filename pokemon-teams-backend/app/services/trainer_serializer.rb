class TrainerSerializer 
    def initialize(trainer_object)
        @trainers = trainer_object 
    end 

    def to_serialized_json
        options = {:include => {
        :pokemons => {:except => [:created_at, :updated_at]}
        }, :only => [:name, :id]}
        @trainers.to_json(options)
    end 
end 