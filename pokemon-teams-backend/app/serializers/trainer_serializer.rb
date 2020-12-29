class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :pokemon
end
