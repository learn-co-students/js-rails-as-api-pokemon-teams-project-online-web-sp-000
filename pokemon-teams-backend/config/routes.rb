Rails.application.routes.draw do
  


  resources :trainers do
    resources :pokemons
  end

  resources :pokemons

  #resources :pokemons
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
