require 'faker'

class Trainer < ApplicationRecord
    has_many :pokemons
end
