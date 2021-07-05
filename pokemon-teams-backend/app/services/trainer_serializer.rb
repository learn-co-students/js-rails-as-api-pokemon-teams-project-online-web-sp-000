class TrainerSerializer

  def intitialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    options = {
      include: {
        pokemons:
        }
      }
    }
    @trainer.to_json(options)
  end 

end
