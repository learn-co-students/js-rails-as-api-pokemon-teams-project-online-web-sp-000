Rails.application.routes.draw do
  #resources :pokemons
  #resources :trainers
  get '/trainers' => "trainers#index"
  get '/trainer/:id' => "trainers#show"
  post '/pokemons' => "pokemons#create"
  delete '/pokemons' => "pokemons#destroy"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
