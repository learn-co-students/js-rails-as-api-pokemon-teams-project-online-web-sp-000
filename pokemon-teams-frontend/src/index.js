const BASE_URL = 'http://localhost:3000'
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', fetchTrainers())

// fetch request to the trainers_url
function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => trainers.forEach(trainer => {
      renderTrainer(trainer)
      trainer.pokemons.forEach(pokemon => { renderPokemon(pokemon) })
    }))
}

// render trainer data to HTML page
function renderTrainer(trainer) {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const button = document.createElement('button')
  const ul = document.createElement('ul')

  div.setAttribute('class', 'card')
  div.setAttribute('data-id', trainer.id)
  p.innerText = trainer.name
  div.append(p, button, ul)
  main.appendChild(div)
  button.setAttribute('data-trainer-id', trainer.id)
  button.innerText = 'Add Pokemon'
  button.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ 'trainer_id': e.target.trainer_id })
    })
      .then(resp => resp.json())
      .then(pokemon => {
        const li = document.createElement('li')
        const deleteBtn = document.createElement('button')
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        deleteBtn.innerText = 'Release'
        deleteBtn.setAttribute('class', 'release')
        deleteBtn.setAttribute('data-pokemon-id', pokemon.id)
        deleteBtn.addEventListener('click', deletePokemon)
        li.append(deleteBtn)
        ul.appendChild(li)
      })
  })
}

// render pokemon data to HTML page
function renderPokemon(pokemon) {
  const ul = document.querySelector(`div[data-id='${pokemon.trainer_id}']`)
  const li = document.createElement('li')
  const deleteBtn = document.createElement('button')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  deleteBtn.innerText = 'Release'
  deleteBtn.setAttribute('class', 'release')
  deleteBtn.setAttribute('data-pokemon-id', pokemon.id)
  deleteBtn.addEventListener('click', deletePokemon)
  li.append(deleteBtn)
  ul.appendChild(li)
}

// Delete pokemon 
function deletePokemon(e) {
  e.preventDefault()
  fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, { method: 'DELETE' })
  e.target.parentElement.remove()
}