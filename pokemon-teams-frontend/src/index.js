const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pretendPokemon = {id: 2, nickname:'Bob', species:'Squirtal'}
const pretendTrainer = {id: 3, name: 'Steven', pokemons:[pretendPokemon]}


function makeTrainerCard(trainer){
  let div = document.createElement('div')
  div.className = 'card'
  div.id = trainer.attributes.id
  div['data-id'] = trainer.attributes.id
  let p = document.createElement('p')
  p.innerText = trainer.attributes.name
  div.appendChild(p)
  let button = document.createElement('button')
  button['data-trainer-id'] = trainer.attributes.id
  button.innerText = 'Add Pokemon'
  div.appendChild(button)
  addPokemon(button, trainer)
  let ul = document.createElement('ul')
  createTrainerPokemon(trainer, ul)
  div.appendChild(ul)
  return div
}

function createTrainerPokemon(trainer, ul){
  for(const pokemon of trainer.attributes.pokemons){
    ul.appendChild(makePokemonLi(pokemon))
  }
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

function addPokemon(button, trainer){
  button.addEventListener('click', function(event) {
    console.log(`${trainer.id} Clicked`)
    let formData = {
      trainer_id: `${trainer.id}`
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(POKEMONS_URL, configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(object){
        let trainer = object.data.relationships.trainer.data
        let ul = document.getElementById(trainer.id).getElementsByTagName('ul')[0]
        ul.appendChild(makePokemonLi(object.data.attributes))
      })
      .catch(function(error){
        console.log(error.message);
      })
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // ul = document.createElement('ul')
  // ul.appendChild(makePokemonLi(pretendPokemon))
  // document.querySelector('main').appendChild(ul)
  // document.querySelector('main').appendChild(makeTrainerCard(pretendTrainer))
  getTrainers()
})
