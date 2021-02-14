Rails.application.routes.draw do
  # resources :pokemons
  # resources :trainers

  get '/trainers' => 'trainers#index'
  get '/pokemons' => 'pokemons#index'
  post '/pokemons' => 'pokemons#create'
  delete '/pokemons/:id' => 'pokemons#destroy'
end
