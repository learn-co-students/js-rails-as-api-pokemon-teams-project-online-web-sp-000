class Pokemon < ApplicationRecord
  
  belongs_to :trainer, optional: true 
 
end
