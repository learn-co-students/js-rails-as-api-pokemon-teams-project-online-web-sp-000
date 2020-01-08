const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let pokemonJsonVar;
let trainerJsonVar;

function getPokemon(trainersJson){
  return fetch(POKEMONS_URL)
    .then((response) => {
      return response.json();
    })
    .then((pokemonJson) => {
      pokemonJsonVar = pokemonJson;
      showCards(createCards(trainersJson, pokemonJson));
    })
    .catch();
}

function getTrainers(){
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then((trainersJson) => {
      trainerJsonVar = trainersJson;
      getPokemon(trainersJson);
    })
    .catch();
}

function getTrainersAndPokemon(){
  getTrainers(); //also gets pokemon
}

function showCards(divs){
  for (let myDiv of divs) {
    document.querySelector('main').append(myDiv);
  }
}

function postPokemon(pokemon, trainer_id){
  console.log(pokemon);
  trainer = trainerJsonVar[trainer_id];
  //console.log(trainer.pokemons);
  console.log(trainer);
  trainer.pokemons.push(pokemon);
  console.log(trainer);

  configData = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trainer)
  }
  fetch(TRAINERS_URL, configData)
  .then()
  .then()
  .catch();
}

function catchPokemon(){
  pokemonId = Math.floor(Math.random() * 11);

  return pokemonJsonVar[pokemonId];
}

function addPokemon(){
  //console.log("add clicked");
  //console.log(trainerJsonVar);

  if (trainerJsonVar[this.getAttribute('data-trainer-id')].pokemons.length < 6){ //if there are < 7 pokemon/li elements
    //console.log(trainerJsonVar[this.getAttribute('data-trainer-id')].pokemons.count);
    postPokemon(catchPokemon(), this.getAttribute('data-trainer-id'));//get a pokemon //fetch post to add pokemon to
  }

}

function removePokemon(){
  console.log("remove clicked");
  console.log(this.getAttribute("data-pokemon-id"));
}

function setDiv(cardDiv, i, cardP, trainersJson, cardAddButton, buttonIdAttribute, divIdAttribute){
  cardDiv.className = "card";
  divIdAttribute.value = (i + 1);
  cardDiv.setAttributeNode(divIdAttribute);

  cardP.innerText = trainersJson[i].name;

  buttonIdAttribute.value = trainersJson[i].id;
  cardAddButton.setAttributeNode(buttonIdAttribute);
  cardAddButton.innerText = "Add Pokemon";
  cardAddButton.addEventListener("click", addPokemon);

  cardDiv.append(cardP);
  cardDiv.append(cardAddButton);
}

function setPokemon(pokemonJson, trainersJson, i, ulObject){


  for (let pokemon of pokemonJson){ //loop through each pokemon
    //let listItem = [];
    if (pokemon.trainer_id == trainersJson[i].id){
      let listItem = document.createElement('li');
      let pokemonButton = document.createElement('button');
      let liButtonIdAttribute = document.createAttribute("data-pokemon-id");

      listItem.innerText = `${pokemon.nickname} (${pokemon.species})`;

      pokemonButton.className = "release";
      pokemonButton.innerText = "Release";

      liButtonIdAttribute.value = pokemon.id;
      pokemonButton.setAttributeNode(liButtonIdAttribute);
      pokemonButton.addEventListener("click", removePokemon);

      listItem.append(pokemonButton);
      ulObject.append(listItem);
    }
  }
}

function createCards(trainersJson, pokemonJson){
  let divs = [];
  let listItems = [];

  for (let i = 0; i < trainersJson.length; i++){
    let cardDiv = document.createElement('div');
    let cardP = document.createElement('p');
    let cardAddButton = document.createElement('button');
    let ulObject = document.createElement('ul');
    let buttonIdAttribute = document.createAttribute("data-trainer-id");       // Create a "class" attribute
    let divIdAttribute = document.createAttribute("data-id");       // Create a "class" attribute

    setDiv(cardDiv, i, cardP, trainersJson, cardAddButton, buttonIdAttribute, divIdAttribute);
    setPokemon(pokemonJson, trainersJson, i, ulObject);

    cardDiv.append(ulObject);
    divs.push(cardDiv);
  }

  return divs;
}

function doCards(){
  getTrainersAndPokemon();
}

window.onload = function(){
  doCards();
};
