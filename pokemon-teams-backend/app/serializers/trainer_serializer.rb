class TrainerSerializer
  # include FastJsonapi::ObjectSerializer
  # attributes :pokemon => {except: [:created_at, :updated_at]}

  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    # @trainer.to_json(:include => {:pokemon => {:except => [:created_at, :updated_at]}}, :except => [:created_at, :updated_at])
    options = {
      :include => {
        :pokemon => {
          :except => [:created_at, :updated_at]}
          },
      :except => [:created_at, :updated_at]
    }
    @trainer.to_json(options)
  end
end
