class TrainerSerializer

    def initialize(trainer_object)
        @trainer = trainer_object
    end

    def to_serialized_json
        options = {
            include: {
                trainer: {
                    only: [:name, :pokemons]
                },
                pokemons: {
                    only: [:nickname, :species, :trainer_id]
                }
            },
        }
        @trainer.to_json(options)
    end

end