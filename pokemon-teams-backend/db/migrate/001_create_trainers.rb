class CreateTrainers < ActiveRecord::Migration 
    def change 
        create_table :trainers do |t|
            t.string :name 
        end 
    end 
end 