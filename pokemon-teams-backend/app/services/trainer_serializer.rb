class TrainerSerializer
  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    options = {
      :include => {
        :pokemons => {
          :only => [:id, :nickname, :species, :trainer_id]
        }
      }, :except => [:created_at, :updated_at]
    }
    @trainer.to_json(options)
  end
end
