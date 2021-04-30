class TrainerSerializer
  # include FastJsonapi::ObjectSerializer
  # attributes :name
  
  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    @trainer.to_json(:include => {
      :pokemons => {
        :except => [:created_at, :updated_at]
      }},
      :except => [:created_at, :updated_at])
  end

end
