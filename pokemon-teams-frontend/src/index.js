const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", event => {
  getTrainers()
})

main.addEventListener('click', event => {
  if(event.target.innerText === 'Add Pokemon'){
    createPokemon(event.target.dataset.trainerId)
  } else if (event.target.className === 'release'){
    removePokemon(event.target)
    destroyPokemon(event.target.dataset.pokemonId)
  }
})

const getTrainers = () => {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainers => {
    renderTrainers(trainers)
  })
}

const renderTrainers = trainers => {
  trainers.forEach(renderTrainer)
}

const renderTrainer = trainer => {
  let card = document.createElement('div')
  let list = document.createElement('ul')

  card.className = 'card'
  card.dataset.id = trainer.id

  card.innerHTML = `
    <p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  `

  trainer.pokemons.forEach(pokemon => {
    renderPokemon(pokemon, list)
  })

  card.append(list)

  main.append(card)
}

const renderPokemon = (pokemon, list) => {
  let li = document.createElement('li')
  li.innerHTML = `
    ${pokemon.nickname} (${pokemon.species}) 
    <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
  `

  list.append(li)
}

const createPokemon = trainerId => {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ trainer_id: trainerId })
  })
  .then(response => response.json())
  .then(data => {
    if(!data.error){
      let card = document.querySelector(`[data-id="${trainerId}"]`)
      let list = card.querySelector('ul')
      renderPokemon(data, list)
    }
  })
}

const removePokemon = button => {
  button.parentNode.remove()
}

const destroyPokemon = pokemonId => {
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(console.log)
}