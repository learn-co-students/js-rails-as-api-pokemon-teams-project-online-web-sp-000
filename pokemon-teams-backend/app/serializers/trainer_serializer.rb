class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :pokemons
  #
  # def initialize(trainer_object)
  #   @trainer = trainer_object
  # end
  #
  # # 1. Works -- look at #3 for cleaner version with options
  # def to_serialized_json
  #   @trainer.to_json(:include => {
  #     :pokemons => {:only => [:id, :nickname, :species, :trainer_id]}
  #     }, :only => [:id, :name])
  # end


  #2. --- same but using :except
  # def to_serialized_json
  #   @trainer.to_json(:include => {
  #     :pokemons => {:only => [:id, :nickname, :species, :trainer_id]}
  #     }, :except => [:updated_at, :created_at])
  # end

  #3.
  # def to_serialized_json
  #   options = {
  #     include: {
  #       pokemons: {
  #         only: [:id, :nickname, :species, :trainer_id]
  #       }
  #     },
  #     only: [:id, :name],
  #   }
  #   @trainer.to_json(options)
  # end

end
