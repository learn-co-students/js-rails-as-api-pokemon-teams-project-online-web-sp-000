class TrainerSerializer

    def initialize(trainer_object)
        @trainer = trainer_object
        # binding.pry
    end

    def to_serialized_json
        options = {
            include: {
                pokemons: {
                    only: [:nickname, :species, :id, :trainer_id]
                }
            }, 
            except: [:created_at, :updated_at],
        }
        @trainer.to_json(options)
        # binding.pry
    end
end