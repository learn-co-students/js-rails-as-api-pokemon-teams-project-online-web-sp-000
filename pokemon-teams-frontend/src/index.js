document.addEventListener('DOMContentLoaded', function(event) {
  getTrainers();
})

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const getTrainers = () => {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
      trainers.forEach(trainer => {
        let newTrainer = new Trainer(trainer);
        let newCard = document.createElement("div");
        newCard.innerHTML = newTrainer.formatIndex();
        document.getElementById('main-container').appendChild(newCard)
        getPokemons(trainer);
      });
    });
};

const getPokemons = (trainer) => {
  let trainersPokemons = trainer.pokemons;
  trainersPokemons.forEach(pokemon => {
    let newPokemon = new Pokemon(pokemon);
    let pokemonHtml = document.createElement('li');
    pokemonHtml.innerHTML = newPokemon.formatIndex();
    document.getElementById(`list-${trainer.id}`).appendChild(pokemonHtml);
  });
};

const onReleaseClick = () => {
  document.querySelector('.release').addEventListener('click', function() {
    console.log('le clic fonctionne')
  })

//).on('click', '.release', function() {

    // let pokemonId = $(this).attr(data-pokemon-id);
    // fetch(`/pokemons/${pokemonId}.json`, {
    //   method: 'DELETE'
    // })
  //})
}

function Trainer(object) {
  this.id = object.id
  this.name = object.name
}

function Pokemon(object) {
  this.id = object.id
  this.species = object.species
  this.nickname = object.nickname
  this.trainer = object.trainer
}

Trainer.prototype.formatIndex = function() {
  let trainerHtml = `<div class="card" data-id="${this.id}"><p>${this.name}</p>
  <button data-trainer-id="${this.id}">Add Pokemon</button>
  <ul id="list-${this.id}"></ul>
  </div>`;
  return trainerHtml;
}

Pokemon.prototype.formatIndex = function() {
  let pokemonHtml = `<li>${this.nickname} (${this.species})
  <button class="release" data-pokemon-id="${this.id}">Release</button>
  </li>
  `
  return pokemonHtml;
}

// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>
