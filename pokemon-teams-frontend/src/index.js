const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
  return fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => renderTrainers(json));
}

function renderTrainers(json) {
  const main = document.querySelector('main');

  main.innerHTML = '';

  json.forEach(trainer => {
    const card = document.createElement('div');

    card.innerHTML =
      `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul id="pokemon-list">
          ${trainer.pokemons.map((pokemon) => {
            return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
          }).join('\n')}
        </ul>
      </div>`;

    const addPokemon = card.querySelector('.add');

    addPokemon.addEventListener("click", event => {
      event.preventDefault();

      createPokemon(trainer);
    });

    const deletePokemonButtons = card.querySelectorAll('.release');

    deletePokemonButtons.forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();

        deletePokemon(button.dataset.pokemonId);
      });
    });

    main.appendChild(card);
  })
}

function createPokemon(trainer) {
  if (trainer.pokemons.length >= 6) {
    alert("You cannot add more than 6 pokemons!");
    return;
  }

  const body = {
    trainer_id: trainer.id
  };

  fetch(POKEMONS_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    fetchTrainers();
  });
}

function deletePokemon(pokemonId) {
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'delete'
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    fetchTrainers();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchTrainers();
});