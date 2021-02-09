Rails.application.routes.draw do
  get '/', to: 'trainers#index'
  post '/pokemons', to: 'pokemons#new'
  post '/pokemons/destroy', to: 'pokemons#destroy'
end
