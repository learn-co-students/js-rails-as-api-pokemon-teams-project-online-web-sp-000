Rails.application.routes.draw do
  resources :pokemons
  resources :trainers, except: [:create, :new]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
