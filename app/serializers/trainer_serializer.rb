class TrainerSerializer
  def initialize(trainer_object)
    @trainer = trainer_object
  end
   
  def to_serialized_json
    @trainer.to_json(:except => [:created_at, :updated_at], :include => {
      :pokemons => {
        :except =>  [:created_at, :updated_at]
      }
    })
  end
end
