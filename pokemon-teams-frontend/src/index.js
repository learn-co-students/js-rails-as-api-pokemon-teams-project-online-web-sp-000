const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')

// document.addEventListener('DOMContentLoaded', function() {
//   fetchTrainersAndPokemons()
//   addTrainerCards()
// })

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(addTrainerCards)

  // create cards for each trainer and add their names from above fetch
function addTrainerCards(trainers) {
  trainers.forEach(trainer => {
    let pokemonList = ""
    trainer.pokemons.forEach(pokemon => {
      pokemonList += `
        <li>${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        </li>`
    })
    mainDiv.innerHTML += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}<p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>${pokemonList}</ul>
    </div>
    `
  })
}

// Whenever a user hits "Add Pokemon" and they have space on their team,
// they should get a new Pokemon.

document.querySelector('data-trainer-id').addEventListener('click', addPokemon)

function addPokemon() {
  let newPokemonObj = {
    nickname: nickname,
    species: species,
    // release:
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newPokemonObj)
  }

  fetch(POKEMONS_URL, configObj)
  .then(resp => resp.json())
  .then(addPokemonToCard)
}

function addPokemonToCard() {
  document.getElementById('toy-collection').appendChild(toyCardDiv)

}
