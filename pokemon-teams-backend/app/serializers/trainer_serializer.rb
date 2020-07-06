class TrainerSerializer
  def initialize(o)
    @trainer = o
  end
  def to_serialized_json
    options = {
      include: {
        pokemon: {
          only: [:id, :nickname, :species, :trainer_id]
        }
      },
      only: [:id, :name],
    }
    @trainer.to_json(options)
  end
end
