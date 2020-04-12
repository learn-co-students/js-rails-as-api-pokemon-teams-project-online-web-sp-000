const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pretendPokemon = {id: 2, nickname:'Bob', species:'Squirtal'}
const pretendTrainer = {id: 3, name: 'Steven', pokemons:[pretendPokemon]}


function makeTrainerCard(trainer){
  let div = document.createElement('div')
  div.className = 'card'
  div['div-id'] = trainer.attributes.id
  let p = document.createElement('p')
  p.innerText = trainer.attributes.name
  div.appendChild(p)
  let button = document.createElement('button')
  button['data-trainer-id'] = trainer.attributes.id
  button.innerText = 'Add Pokemon'
  div.appendChild(button)
  let ul = document.createElement('ul')
  for(const pokemon of trainer.attributes.pokemons){
    ul.appendChild(makePokemonLi(pokemon))
  }
  div.appendChild(ul)
  return div
}

function makePokemonLi(pokemon){
  let li = document.createElement('li')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  releaseButton = document.createElement('button')
  releaseButton.className = 'release'
  releaseButton.innerText = 'Release'
  li.appendChild(releaseButton)
  li['data-pokemon-id'] = pokemon.id
  return li
}

function getTrainers(){
  fetch(TRAINERS_URL)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    displayTrainers(json.data)
  })
  .catch(function(error){
    console.log(error)
  })
}

function displayTrainers(trainers){
  main = document.querySelector('main')
  for(const trainer of trainers){
    main.appendChild(makeTrainerCard(trainer))
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ul = document.createElement('ul')
  // ul.appendChild(makePokemonLi(pretendPokemon))
  // document.querySelector('main').appendChild(ul)
  // document.querySelector('main').appendChild(makeTrainerCard(pretendTrainer))
  getTrainers()
})
