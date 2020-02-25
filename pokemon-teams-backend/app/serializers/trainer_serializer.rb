class TrainerSerializer
  
  def initialize(group)
    @trainers = group
  end
   
  def to_serialized_json
    @trainers.to_json(:include => {:pokemons => {:only => [:id, :nickname, :species, :trainer_id]}},
    :except => [:created_at, :updated_at])
     
  end

end
# (:only => [:id, :name])
#      :include =>{:pokemon => {:only => [:id, :nickname, :species, :trainer_id]}}