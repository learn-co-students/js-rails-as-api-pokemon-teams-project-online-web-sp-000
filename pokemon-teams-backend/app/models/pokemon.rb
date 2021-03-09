class Pokemon < ApplicationRecord
    belongs_to :trainer
  # validates :species ,uniqueness: true
end
