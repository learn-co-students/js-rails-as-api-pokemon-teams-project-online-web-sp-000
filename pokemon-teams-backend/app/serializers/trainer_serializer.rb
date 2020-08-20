class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
  has_many :pokemon
end
