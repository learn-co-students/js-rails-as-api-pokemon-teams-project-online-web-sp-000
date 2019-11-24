class TrainerSerializer
  
  def initialize(trainer)
    @trainer = trainer
  end

  def to_serialized_json
    options = {
      include: {
        pokemon: {
          only: [:id, :nickname, :species]
        }
      }
    }
    @trainer.to_json(options)
  end

end
