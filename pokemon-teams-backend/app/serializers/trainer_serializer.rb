class TrainerSerializer
    def initialize(trainer_object)
        @trainer = trainer_object
    end
    def to_serialized_json
        options = {
            include: {
                pokemons: {
                except: [:created_at, :updated_at]
                }
            }, 
            only: [:id, :name]
        }
        @trainer.to_json(options)
    end
end