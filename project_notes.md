# Deliverables
<!-- When a user loads the page, they should see all trainers,
with their current team of Pokemon. -->

Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.

Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.

Inside directory:
* $ rails new pokemon-teams-backend --api

Inside Gemfile:
* gem 'faker'
* uncomment rack-cors

Inside config/initializers/cors.rb:
* uncomment the middleware

* $ rails g resource trainer name
* $ rails g resource pokemon species nickname trainer:references
* $ rails db:migrate

Set Up Associations

Enter data to the db inside seeds.rb
* $ rails db:seed

Test with rails console
