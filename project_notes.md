What does the api flag do? (rails new pokemon-teams-backend --api)
    *** Creates new folder (pokemon-teams-backend)
    *** Difference with rails resource generator????

    Rails will remove a lot of default features and middleware, mostly related to the browser, since it won't be needed. 
    Controllers will inherit from ActionController::API rather than ActionController::Base and generators will skip generating views.


    While working on your own APIs, you'll typically want to have your Rails server running while also trying out various endpoints using fetch(). In order to do this, though, you will need deal with Cross-Origin Resource Sharing, or CORS.

    CORS is designed to prevent scripts like fetch() from one origin accessing a resource from a different origin unless that resource specifically states that it expects to share. So, for instance, if you have run the command rails server with your server running at http://localhost:3000, then go to 'www.google.com,' open the browser console and attempt to send a fetch() to your server. The browser considers these two different origins, and will refuse your request.

    A solution is already provided though. By using the --api flag, the Gemfile was altered to include the rack-cors gem


(1) Get all trainers and their current pokemon Team
    *** Have a index route in trainer controller
    *** Draw route for index trainers
    *** render json    

(2) When User hits "Add Pokemon" and they have space on team, get a new Pokemon (LIMIT of 6 per Team)
    *** update route in trainer controller
    ** Event Listener for Add Pokemon Button (click, function adds new pokemon to trainers current pokemon team)
        ** Number of Event Listeners should be 1:1 for Trainer

(3) When User hits "Release Pokemon" on specific Pokemon team, specific Pokemon should be release from team
    ** destroy route trainer controller
    ** Event Listener for Release Pokemon Button (click, removeChild? )
        ** Number of Event Listeners should be current size of team. Max of 6 (size of team). 1 for each Pokemon <---- this might be way to go (Pay Attention to suggested HTML)

Rails.application.routes.draw do
  get '/birds' => 'birds#index'
  get '/birds/:id' => 'birds#show' # new
end

**** Converting database data to json format
def index
  birds = Bird.all
  render json: birds
end

Using Slice method
def index
  birds = Bird.all
  render json: birds, only: [:id, :name, :species]
end

** Using Except
def index
  birds = Bird.all
  render json: birds, except: [:created_at, :updated_at]
end

*** Nesting Models

rails g resource sighting bird:references location:references

def show
  sighting = Sighting.find_by(id: params[:id])
  render json: sighting, include: [:bird, :location]
end

def index
  sightings = Sighting.all
  render json: sightings, include: [:bird, :location]
end

*** Nesting Models with Errro Handling
def show
  sighting = Sighting.find_by(id: params[:id])
  if sighting
    render json: sighting.to_json(include: [:bird, :location])
  else
    render json: { message: 'No sighting found with that id' }
  end
end


*** Setting up Fast JSON API
To include Fast JSON API, add gem 'fast_jsonapi' to your Rails project's Gemfile and run bundle install.

Once installed, you will gain access to a new generator, serializer.

rails g serializer Bird
rails g serializer Location
rails g serializer Sighting

class SightingsController < ApplicationController
  def show
    sighting = Sighting.find(params[:id])
    render json: SightingSerializer.new(sighting)
  end

  def index
    sightings = Sighting.all
    render json: SightingSerializer.new(sightings)
  end

end


Adding Attributes with FAST JSON API

class BirdSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :species
end

class LocationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :latitude, :longitude
end

class SightingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :created_at
end

Adding Relationships with FAST JSON API

class SightingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :created_at
  belongs_to :bird
  belongs_to :location
end

def show
  sighting = Sighting.find_by(id: params[:id])
  options = {
    include: [:bird, :location]
  }
  render json: SightingSerializer.new(sighting, options)
end

Fast and Easy to Implement BUT
In using Fast JSON API though, we lose the ability to design the structure of our JSON data.
