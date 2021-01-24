const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/trainers')
    .then(response => response.json())
    .then(trainers => renderTrainers(trainers))
})

  const renderTrainers = (trainers) => {
    console.log(trainers)
    trainers.map(function(trainer) {
        `
        <div class="card" data-id="1">
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
        <li>${trainer.pokemons.name} 
        <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button>
        </li>
        </ul>
        </div>
        `
    })
  }