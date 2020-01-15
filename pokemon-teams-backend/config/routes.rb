Rails.application.routes.draw do
  resources :pokemons, only: [:index]
  #post 'trainers/:id'
  #post 'trainers/:id' => "forums#create", :as => :create_forum

  resources :trainers, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


end
