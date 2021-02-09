Rails.application.routes.draw do
  # resources :pokemons
  # resources :trainers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/trainers' => 'trainers#index'
  post '/pokemons' => 'pokemons#create'
  delete '/pokemons/:pokemon_id' => 'pokemons#destroy'
end
