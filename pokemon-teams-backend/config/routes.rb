Rails.application.routes.draw do
  # resources :pokemons
  # resources :trainers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'pokemons', to: 'pokemons#index'
  post 'pokemons', to:'pokemons#create'
  delete 'pokemons/:id', to: 'pokemons#delete'
  get 'trainers', to: 'trainers#index'
  get 'trainers/:id', to: 'trainers#show'

end
