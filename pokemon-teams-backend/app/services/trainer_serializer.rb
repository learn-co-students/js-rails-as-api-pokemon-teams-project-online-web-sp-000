# class TrainerSerializer
#   include FastJsonapi::ObjectSerializer
#   attributes :name
#   has_many :pokemons
# end

class TrainerSerializer

  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          except: [:updated_at, :created_at]
        }
      },
      except: [:updated_at, :created_at]
    }
    @trainer.to_json(options)
  end

end