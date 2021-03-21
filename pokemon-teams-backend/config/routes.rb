Rails.application.routes.draw do
  resources :pokemons, only: [:destroy]
  resources :trainers, only: [:show, :index]
  post 'trainers/:id/pokemons', to: 'pokemons#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
