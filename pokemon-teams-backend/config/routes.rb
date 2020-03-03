Rails.application.routes.draw do
  # resources :pokemons
  # resources :trainers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    resources :pokemons, only: [:index, :show, :new, :create, :destroy]
    resources :trainers, only: [:index, :show]
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    post 'pokemons/' => "pokemons#create"
end
