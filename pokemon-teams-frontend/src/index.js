const BASE_URL = 'http://localhost:3000'
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  fetch(TRAINERS_URL).then(r => r.json()).then(trainers => {
    trainers.forEach(createCard)
  })
})

const createCard = trainer => {
  const main = document.querySelector('main')
  // Set up card
  const card = document.createElement('div')
  card.className = 'card'
  card.dataset.id = trainer.id
  // Add name to card
  const name = document.createElement('p')
  name.innerText = trainer.name
  card.appendChild(name)
  // Add "Add Pokemon" button to card
  const addBtn = document.createElement('button')
  addBtn.dataset.trainerId = trainer.id
  addBtn.innerText = 'Add Pokemon'
  addBtn.addEventListener('click', e => {
    addNewPokemon(trainer.id)
  })
  card.appendChild(addBtn)
  const pokemonList = createPokemonList(trainer)
  card.appendChild(pokemonList)
  main.appendChild(card)
}

const createPokemonList = trainer => {
  const ul = document.createElement('ul')
  const pokemonList = trainer.pokemon.forEach(pokemon => {
    ul.appendChild(addPokemon(pokemon))
  })
  return ul
}

const addPokemon = pokemon => {
  const li = document.createElement('li')
  const releaseBtn = document.createElement('button')
  releaseBtn.className = 'release'
  releaseBtn.dataset.pokemonId = pokemon.id
  releaseBtn.innerText = 'Release'
  releaseBtn.addEventListener('click', e => {
    removePokemon(pokemon.id)
  })
  li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `
  li.appendChild(releaseBtn)
  return li
}

const addNewPokemon = trainerId => {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      id: trainerId
    })
  })
    .then(res => res.json())
    .then(pokemon => {
      document.querySelector(`[data-id='${trainerId}']`).querySelector('ul').appendChild(addPokemon(pokemon))
    })
}

const removePokemon = pokemonId => {
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      id: pokemonId
    })
  })
    .then(res => res.json())
    .then(pokemon => {
      console.log(pokemon)
      const pokeLi = document.querySelector(`[data-pokemon-id='${pokemon.id}']`).parentElement
      pokeLi.parentElement.removeChild(pokeLi)
    })
}
