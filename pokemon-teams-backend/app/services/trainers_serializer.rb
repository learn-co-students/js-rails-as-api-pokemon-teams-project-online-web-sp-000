class TrainersSerializer
    def initialize(trainer_object)
        @trainer = trainer_object
    end

    def to_serialized_json
        options = {
            except: [:created_at, :updated_at],
            include: {
                pokemons: {
                    only: [:id, :species, :nickname, :trainer_id]
                }
            }
        }
        @trainer.to_json(options)
    end

end
