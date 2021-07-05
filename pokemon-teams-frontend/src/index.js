const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
  loadTrainers();
})

function loadTrainers () {
  return fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    object.forEach(trainer => {
      createDiv(trainer);
    })
  });
}

function createDiv(trainer) {
  div = document.createElement('div');
  div.className = 'card';
  div.setAttribute('data-id', trainer.id);
  p = document.createElement('p');
  p.innerText = trainer.name;
  div.appendChild(p);
  button = document.createElement('button');
  button.setAttribute('data-trainer-id', trainer.id)
  button.innerText = 'Add Pokemon';
  button.addEventListener('click', function(e) {
    addPokemon(trainer);
    e.preventDefault();
  }, false);
  div.appendChild(button);
  ul = document.createElement('ul');
  div.appendChild(ul);
  trainer.pokemons.forEach(pokemon => {
    createPokemonLi(pokemon);
  })
  document.querySelector('main').appendChild(div);
}

function createPokemonLi(pokemon) {
  li = document.createElement('li');
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;
  button = document.createElement('button');
  button.innerText = 'Release';
  button.className = 'release';
  button.setAttribute('data-pokemon-id', pokemon.id);
  button.addEventListener('click', function(e) {
    e.preventDefault();
    release(pokemon);
  }, false)
  li.appendChild(button);
  ul.appendChild(li);
}


function addPokemon(trainer) {
    return fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "trainer_id": trainer.id
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      let ul = document.querySelector(`[data-id = "${trainer.id}"]`).querySelector('ul');
      let li = document.createElement('li');
      li.innerText = `${object.nickname} (${object.species})`;
      button = document.createElement('button');
      button.innerText = 'Release';
      button.className = 'release';
      button.setAttribute('data-pokemon-id', object.id);
      button.addEventListener('click', function(e) {
        e.preventDefault();
        release(object);
      }, false)
      li.appendChild(button);
      ul.appendChild(li);
    })
    .catch(function(error) {
      console.log("You already have 6 Pokemon on your team.");
    })
}

function release(pokemon) {
  return fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "pokemon_id": pokemon.id
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    li = document.querySelector(`[data-pokemon-id = "${object.id}"]`).parentElement;
    li.remove();
  })
}
