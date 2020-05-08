const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.getElementsByTagName('main')[0];
 

document.addEventListener('DOMContentLoaded', () => {
  createInitialTeams();
});

function createInitialTeams() {
  return fetch("http://localhost:3000/trainers")
  .then(function(response) {
    return response.json();
  })
  .then(function(Obj) {
    let arrayOfTrainerObjects = Obj['data'];
    //console.log(arrayOfTrainerObjects[0]); //! returns trainer object
    for (const trainer of arrayOfTrainerObjects) {
      // console.log(trainer) => {id: "5", type: "trainer", attributes: {…}}
      insertTrainerIntoDOM(trainer);
    }
  });
};

function insertTrainerIntoDOM(trainerObj) {

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
  addPokemonBtn.addEventListener('click', createAdditionToTeam);

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
      trainerDiv.appendChild(pokemonLi);
    }
};

function createAdditionToTeam() {
  //prevent button defaults
  event.preventDefault();
  //check if there are less than 6 pokemon on team, if so, create one
  let cardElement = event.target.parentElement;
  if (cardElement.getElementsByTagName('li').length < 6) {
    //create new pokemon
    createPokemon(event);
  } else {
    console.log('Already 6 on this team');
  } 
  //add new pokemon to DOM

  //add new pokemon to db
}

function createPokemon(event) {
  let trainerId = event.target.getAttribute('data-trainer-id');
  let dataObj = {"id": `${trainerId}`};
  
  let configObj = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(dataObj)
  };
  
  fetch('http://localhost:3000/pokemons', configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
  });
}