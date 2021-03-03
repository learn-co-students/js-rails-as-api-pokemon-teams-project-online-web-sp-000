Rails.application.routes.draw do
  get '/trainers' => 'trainers#index'
  post '/pokemons' => 'pokemons#create'
  delete '/pokemons/:id' => 'pokemons#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
