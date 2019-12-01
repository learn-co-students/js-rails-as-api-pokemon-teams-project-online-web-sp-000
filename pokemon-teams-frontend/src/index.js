const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function fetchTrainers() {
  fetch (TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => displayTrainers(json))
}

function fetchPokemon(url, div){
  fetch(url)
  .then(resp => resp.json())
  .then(json => displayPokemon(json, div))
}

function displayTrainers(object){
  for (trainer of object.data) {
    const main = document.getElementsByTagName('main')[0]
    const div = document.createElement('div')
    const divid = document.createAttribute("data-id")
    div.className = "card"
    divid.value = trainer["id"]
    div.setAttributeNode(divid)
    createName(trainer, div)
    createButton(trainer, div)
    createPokemonList(trainer, div)
    main.appendChild(div)
  }
}

function displayPokemon(object, div) {
  const ul = document.createElement('ul')
  for (pokemon of object.included) {
    const li = document.createElement('li')
    li.innerHTML = pokemon["attributes"].nickname  + " " + `(${pokemon["attributes"].species})`
    createRemoveButton(pokemon, li)
    ul.appendChild(li)
  }
  div.appendChild(ul)
}


function createName(trainer, div){
  const p = document.createElement('p')
  p.innerHTML = trainer["attributes"]["name"]
  div.appendChild(p)
}

function createButton(trainer, div){
  const btn = document.createElement('button')
  const batt = document.createAttribute('data-trainer-id')
  batt.value = trainer["id"]
  btn.setAttributeNode(batt)
  btn.innerHTML = "Add Pokemon"
  btn.addEventListener('click', () => {
    createPokemon(trainer["id"])
  })
  div.appendChild(btn)
}

function createRemoveButton(pokemon, li){
  const btn = document.createElement('button')
  const batt = document.createAttribute('data-pokemon-id')
  batt.value = pokemon["id"]
  btn.setAttributeNode(batt)
  btn.className = "release"
  btn.innerHTML = "Release"
  btn.addEventListener('click', () => {
    btn.parentElement.remove()
    releasePokemon(pokemon["id"])
  })
  li.appendChild(btn)
}

function addPokemonToList(object, div) {
  const ul = div.children[2]
  const li = document.createElement('li')
  li.innerHTML = object.data.attributes.nickname + " " + `(${object.data.attributes.species})`
  createRemoveButton(object.data, li)
  ul.appendChild(li)
  div.appendChild(ul)
}


function createPokemonList(trainer, div) {
  const trainerURL = TRAINERS_URL + `/${trainer["id"]}`
  fetchPokemon(trainerURL, div)
}

function createPokemon(trainer_id) {
  div = document.querySelectorAll(`[data-id = '${trainer_id}']`)[0]
  const createPokemonForm = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Action': 'application/json'
    },
    body: JSON.stringify(`{trainer_id: ${trainer_id}}`)
  }
  json = fetch(POKEMONS_URL, createPokemonForm)
  .then(resp => resp.json())
  .then(json => addPokemonToList(json, div))
  .catch()
}

function releasePokemon(pokemon_id) {
  const url = POKEMONS_URL + `/${pokemon_id}`
  const destroyPokemonForm = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Action': 'application/json'
    }
  }
  fetch(url, destroyPokemonForm)
}
document.addEventListener('DOMContentLoaded', () => {
  fetchTrainers()
})
