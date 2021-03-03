const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');


function getTrainers() {
  return fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
      trainers.forEach(trainer => {
      //  console.log(trainer);
       renderTeams(trainer);
      })
    });
}

function newPokemonLi(pokemon) {
  const li = document.createElement('li');
  const releaseBtn = document.createElement('button');

  li.textContent = `${pokemon.nickname} (${pokemon.species})`;

  releaseBtn.textContent = "Release";
  releaseBtn.className = "release";
  releaseBtn.setAttribute('data-pokemon-id', pokemon.id);

  li.appendChild(releaseBtn);
  return li;
}

function addPokemonFor(trainer, pokemonsList) {
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id
    })
  };

  fetch(POKEMONS_URL, configObject)
    .then(resp => resp.json())
    .then(function(pokemonObj) {
      pokemonsList.appendChild( newPokemonLi(pokemonObj) )
    })
    .catch(error => {
      console.log(error.message);
    });
}


function renderTeams(trainer) {
  const divCard = document.createElement('div');
  const p = document.createElement('p');
  const addPokemonBtn = document.createElement('button');
  const pokemonsList = document.createElement('ul');
  const pokemons = trainer.pokemons;

  p.textContent = trainer.name;
  
  addPokemonBtn.textContent = "Add Pokemon";
  addPokemonBtn.setAttribute('data-trainer-id', trainer.id)
  
  pokemons.forEach(pokemon => {
    pokemonsList.appendChild( newPokemonLi(pokemon) );
  })

  addPokemonBtn.addEventListener('click', function() {
    const pokemonCount = divCard.getElementsByTagName('li').length;

    console.log('clicked');
    if (pokemonCount < 6) {
      addPokemonFor(trainer, pokemonsList);
    } 
  })
  
  divCard.className = "card";
  divCard.setAttribute('data-id', trainer.id);
  divCard.append(p, addPokemonBtn, pokemonsList);
  main.appendChild(divCard);
}

getTrainers();