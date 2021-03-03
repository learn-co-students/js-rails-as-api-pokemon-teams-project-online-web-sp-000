class TrainerSerializer

  def initialize(trainer)
    @trainer = trainer
  end

  def to_serialized_json
    options = {
			include: {
				pokemons: {
					only: [:id, :nickname, :species, :trainer_id]
				}
			},
			except: [:updated_at, :created_at]
		}
    @trainer.to_json(options)
  end

end
