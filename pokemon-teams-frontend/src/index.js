const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.getElementsByTagName('main')[0];
 

document.addEventListener('DOMContentLoaded', () => {
  createInitialTeams();
});

function createInitialTeams() {
  return fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(Obj) {
    let arrayOfTrainerObjects = Obj['data'];
    //console.log(arrayOfTrainerObjects[0]); //! returns trainer object
    for (const trainer of arrayOfTrainerObjects) {
      // console.log(trainer) => {id: "5", type: "trainer", attributes: {…}}
      renderTrainer(trainer);
    }
  });
};

function renderTrainer(trainerObj) {
  let trainerDiv = document.createElement('div');
  trainerDiv.className = 'card';
  trainerDiv.setAttribute('data-id', trainerObj.id);
  mainDiv.appendChild(trainerDiv);

  let nameP = document.createElement('p');
  nameP.innerText = trainerObj.attributes.name;
  trainerDiv.appendChild(nameP);

  let addPokemonBtn = document.createElement('button');
  addPokemonBtn.innerText = 'Add Pokemon';
  addPokemonBtn.setAttribute('data-trainer-id', trainerObj.id);
  trainerDiv.appendChild(addPokemonBtn);
  addPokemonBtn.addEventListener('click', createPokemon);

  let teamUl = document.createElement('ul');
  trainerDiv.appendChild(teamUl);
  let pokemonsArrayOfObjects = trainerObj.attributes.pokemons
    for (const pokemon of pokemonsArrayOfObjects) {
      // pokemon => {id: 1, species: "Jynx", nickname: "Tobi", trainer_id: 1, created_at: "2020-05-07T00:06:28.631Z", …}
      let pokemonLi = document.createElement('li');
      let releaseButn = document.createElement('button');
      releaseButn.className = 'release';
      releaseButn.setAttribute('data-pokemon-id', pokemon.id);
      releaseButn.innerText = 'Release';
      pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
      pokemonLi.appendChild(releaseButn);
      releaseButn.addEventListener('click', deletePokemon); 
      trainerDiv.appendChild(pokemonLi);
    }
};

function renderPokemon(pokemon) {
  console.log(pokemon);
}

function createPokemon(event) {
  //prevent button defaults
  event.preventDefault();
  let trainerId = event.target.getAttribute('data-trainer-id');
  //let cardElement = event.target.parentElement;

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"trainer_id": trainerId})
  }
  fetch(POKEMONS_URL, configObj)
  .then(resp => resp.json())
  .then(json => {
    if (json.message) {
      alert(json.message);
    } else {
      renderPokemon(json);
    };
  })
}

function renderPokemon(pokemon) {
  const ul = document.querySelector('div[data-id="${pokemon.trainer_id}"]')
  console.log(ul);
}


function deletePokemon(event) {
  event.preventDefault();
  let id = event.target.getAttribute('data-pokemon-id');
  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
   }
   fetch(`${POKEMONS_URL}/${id}`, configObj)
   event.target.parentElement.remove();
};
