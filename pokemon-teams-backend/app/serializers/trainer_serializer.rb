class TrainerSerializer
  def initialize(training_object)
    @training = training_object
  end

  def to_serialized_json
    options = {
    include: {
      pokemons: {
        only: [:id, :nickname, :species]
      }
    },
    except: [:updated_at, :created_at],
    }
    @training.to_json(options)
  end
end
