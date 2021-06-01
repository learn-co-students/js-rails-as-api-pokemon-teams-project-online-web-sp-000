## Generate Backend 
rails new pokemon-teams-backend --api will in fact work with all the rails versions (as of 6/1/2021)

## Housekeeping 
delete gif folder in backend folder (cd pokemon-teams-backend, rm -rf .git, shouldn't do anything)
uncomment rack-cors
    -- once done, uncomment rails application middleware code in -backend/config/initializers/cors.rb
add gem 'faker'

## Zeitwerk error
Version incompatibility error, NameError: uninitialized constant Zeitwerk popped up, will try again later from beginning on a different version of Rails.