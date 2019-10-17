const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector('main')

loadEventListeners()

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTrainers)
  document.addEventListener('click', removePokemon)
  document.addEventListener('click', addPokemon)
}

function getTrainers() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => displayTrainers(data))
    .catch(error => console.log(error))
}

function addPokemon(e) {
  if (e.target.classList.contains('add-pokemon')) {
    if (e.target.parentElement.childElementCount < 10) {
      const pokemonId = parseInt(e.target.getAttribute('data-trainer-id'))

      let formData = {
        trainer_id: pokemonId
      };

      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      };

      fetch(POKEMONS_URL, configObj)
        .then(response => response.json())
        .then(object => addPokemonUI(object, e.target.parentElement))
        .catch(error => console.log(error.message));

    } else {
      alert("You don't have room on your roster for another Pokemon")
    }
  }
}

function removePokemon(e) {
  if (e.target.classList.contains('release')) {
    const pokemonId = parseInt(e.target.getAttribute('data-pokemon-id'))

    fetch(`http://localhost:3000/pokemons/${pokemonId}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => {
        e.target.parentElement.remove()
      })
      .catch(error => console.log(error))
  }

  e.preventDefault();
}

function displayTrainers(data) {
  let trainers = ''
  data.forEach((trainer) => {
    let pokemons = '';

    trainer.pokemons.forEach((pokemon) => {
      pokemons += `
      <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
      `
    })

    trainers += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}" class="add-pokemon">Add Pokemon</button>
    ${pokemons}
    </div>
    `
  })
  mainTag.innerHTML = trainers;
}

function addPokemonUI(pokemon, card) {
  let li = document.createElement('li')
  li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
  card.appendChild(li)
}
