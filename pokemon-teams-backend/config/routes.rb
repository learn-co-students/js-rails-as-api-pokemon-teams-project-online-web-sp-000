Rails.application.routes.draw do
  resources :trainers, only: [:index] do
    resources :pokemons, only: [:create, :index, :destroy]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

#       Prefix Verb   URI Pattern                                         Controller#Action
#  trainer_pokemons GET    /trainers/:trainer_id/pokemons(.:format)            pokemons#index
#                   POST   /trainers/:trainer_id/pokemons(.:format)            pokemons#create
#   trainer_pokemon DELETE /trainers/:trainer_id/pokemons/:id(.:format)        pokemons#destroy
#          trainers GET    /trainers(.:format)                                 trainers#index
