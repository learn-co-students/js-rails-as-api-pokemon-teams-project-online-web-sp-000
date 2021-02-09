Rails.application.routes.draw do
  resources :pokemons
  #resources :trainers
  get '/trainers' => 'trainers#index'
  get '/trainers/:id' => 'trainers#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
