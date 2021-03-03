const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');


function getTrainers() {
  return fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
      trainers.forEach(trainer => {
       console.log(trainer);
       renderTeams(trainer);
      })
    });
}

function newPokemon(pokemon) {
  const li = document.createElement('li');
  li.textContent = `${pokemon.nickname} (${pokemon.species})`;
  return li;
}


function renderTeams(trainer) {
  const divCard = document.createElement('div');
  const p = document.createElement('p');
  const addPokemonBtn = document.createElement('button');
  const pokemonsList = document.createElement('ul');
  const pokemons = trainer.pokemons;
  
  p.innerText = trainer.name;
  
  addPokemonBtn.textContent = "Add Pokemon";
  addPokemonBtn.setAttribute('data-trainer-id', trainer.id)
  
  pokemons.forEach(pokemon => {
    pokemonsList.appendChild( newPokemon(pokemon) );
  })
  
  divCard.className = "card";
  divCard.setAttribute('data-id', trainer.id);
  divCard.append(p, addPokemonBtn, pokemonsList);
  main.appendChild(divCard);
}

getTrainers();