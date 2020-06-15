Rails.application.routes.draw do
  #resources :pokemons
  get '/pokemon', to: 'pokemons#index'
  get '/pokemon/unclaimed', to: 'pokemons#unclaimed_index'
  get '/pokemon/unclaimed/first', to: 'pokemons#first_unclaimed'
  get '/pokemon/:id', to: 'pokemons#show'
  post '/pokemon', to: 'pokemons#create'
  patch '/pokemon/:id', to: 'pokemons#update'

  #resources :trainers
  get '/trainers', to: 'trainers#index'
  get '/trainers/:id', to: 'trainers#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
