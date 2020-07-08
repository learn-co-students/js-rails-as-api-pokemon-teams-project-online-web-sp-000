class BackendSerializer

  def initialize(backend_obj)
    @backend_obj = backend_obj
  end

  def to_serialized_json
    
    options = {

  include: {
    pokemon: {
      only: [:nickname, :species]
    },
    trainer: {
      only: [:name]
    }
  },
  except: [:updated_at],
}
  @backend_obj.to_serialized_json(options)

  end

end
