const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

trainers = []

window.addEventListener('load', function () {
  loadTrainers().then(trainers => {
    trainers.forEach(trainer => {
      renderTrainers(trainer)
    });
  })
})


function loadTrainers() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
}

function loadPokemon() {
  fetch(POKEMONS_URL)
  .then(resp => resp.json());
}

const container = document.getElementById('container');

function renderTrainers(trainer) {
  const card = document.createElement('div');
  card.classList = "trainer-card";

    const content = `
      <div class="trainer-card" data-id="${index}"><p>${trainer.name.value}</p>
        <button data-trainer-id="${index}">Add Pokemon</button>
        <ul id="pokemon-list">
          Pokemone go here
        </ul>
      </div>
    `;
    container.innerHTML += content;
}

