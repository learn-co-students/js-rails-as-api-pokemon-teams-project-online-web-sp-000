Rails.application.routes.draw do
  resources :pokemons, only: %i[index create show destroy]
  get '/trainers', to: 'trainers#index'
  get '/trainers/:id', to: 'trainers#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
