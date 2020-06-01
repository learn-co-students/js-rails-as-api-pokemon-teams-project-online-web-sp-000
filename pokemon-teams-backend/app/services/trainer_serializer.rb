class TrainerSerializer
    def initialize(trainer)
      @trainer = trainer
    end
  
    def to_serialized_json
      @trainer.to_json(:include => {
        :pokemon => { :only => [:id, :nickname, :species, :trainer_id] }
      }, :except => [:created_at, :updated_at])
    end
  end