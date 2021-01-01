class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :pokemon => {except: [:created_at, :updated_at]}
end
