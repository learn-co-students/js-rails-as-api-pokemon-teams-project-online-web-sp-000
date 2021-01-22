Rails.application.routes.draw do
  resources :trainers, only: [:show, :index]
  resources :pokemons, only: [:create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
