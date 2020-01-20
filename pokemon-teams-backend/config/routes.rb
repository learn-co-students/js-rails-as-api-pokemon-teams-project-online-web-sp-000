Rails.application.routes.draw do
  resources :pokemons, only: [:index]

  resources :trainers, only: [:index, :show, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #post 'trainers/:id'
  #post 'trainers/:id' => "forums#create", :as => :create_forum


end
