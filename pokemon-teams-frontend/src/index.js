// const { createElement } = require("parse5/lib/tree-adapters/default")

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const url = 'http://localhost:3000/trainers'
const main = document.querySelector('main')

 function fetching(){
   fetch(url)
   .then(function(response){
      return  response.json() 
   })
   .then(function(data){
       render(data)   
   })
 }

function render(data){
 data.forEach(function(trainer) {
    let pokemonTrainer =  document.createElement('div')
    pokemonTrainer.className = 'card'
    pokemonTrainer.id = `trainer-${trainer.id}`
    main.appendChild(pokemonTrainer)

    let trainerName = document.createElement("h2")
    trainerName.textContent = trainer.name
    pokemonTrainer.appendChild(trainerName)

    let addButton = document.createElement('button')
    addButton.id = trainer.id
    addButton.textContent = 'Add Pokemon'
    pokemonTrainer.appendChild(addButton)
    addButton.addEventListener('click',addPokemons)

    let pokemonUl = document.createElement('ul')
    pokemonTrainer.appendChild(pokemonUl)

    trainer.pokemons.forEach(function(pokemon){
      pokemon.trainer_id = addButton.id
      addPokemonToTrainer(pokemon)
    })
 });
}

function addPokemons(e){
      const trainerId = {trainer_id: e.target.id}
      fetch(POKEMONS_URL, 
      { 
         method: "POST", 
         headers: { "Content-type": "application/json"  , "Accept": "application/json"
        }, 
        body: JSON.stringify(trainerId)
      }
     )
   .then(function(response) {
       return response.json()
     })
   .then(function(data) {
      addPokemonToTrainer(data)
     })
   .catch(error =>{console.log(error)})

 }

function releasePokemon(e){
   fetch(`${POKEMONS_URL}/${e.target.id}`, 
      { 
         method: "DELETE", 
      }
   
   ) 
   const pokemon = document.getElementById(`pokemon-${e.target.id}`)
   pokemon.remove()

}

function addPokemonToTrainer(pokemon){
   const  trainer = document.getElementById(`trainer-${pokemon.trainer_id}`)
   const pokemonUl = trainer.querySelector('ul')

   let pokemonLi = document.createElement('li')
   pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`
   pokemonLi.id = `pokemon-${pokemon.id}`
   pokemonUl.appendChild(pokemonLi)

   let releasePokemonButton = document.createElement('button')
   releasePokemonButton.className = "release"
   releasePokemonButton.id = pokemon.id
   releasePokemonButton.textContent = 'Release'
   pokemonLi.appendChild(releasePokemonButton)
 
   releasePokemonButton.addEventListener('click',releasePokemon)


}
     fetching()
