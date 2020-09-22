const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
  fetchTrainersAndPokemons()
  addTrainerCards()
})

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
function fetchTrainersAndPokemons() {
  fetch("http://localhost:3000/trainers")
    .then(resp => resp.json())
    .then(console.log)
}

  // left off here - just trying to create cards for each trainer and add their names from above fetch
function addTrainerCards(trainers) {
  trainers.forEach(trainer => {
    let pokemonList = ""
    trainer.pokemons.forEach(pokemon => {
      pokemonList += `
        <li>${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        </li>`
    })
})
}
