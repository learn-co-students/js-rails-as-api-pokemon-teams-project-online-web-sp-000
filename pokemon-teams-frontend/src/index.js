//const req = require([]);
//const faker = require('faker');

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
  let myMain = document.querySelector('main');

  myMain.innerHTML = "";
  for (let myDiv of divs) {
    myMain.append(myDiv);
  }
}

function postPokemon(pokemon, trainer_id){
  console.log("pokemonId: " + JSON.stringify(pokemon["pokemonId"]) + " Species: " + JSON.stringify(pokemon["species"]));
  console.log("logTrainerId: " + trainer_id);
  trainer = trainerJsonVar[trainer_id-1];
  //console.log("logTrainerPokemon: " + JSON.stringify(trainer.pokemons));
  console.log("logTrainer: " + JSON.stringify(trainer));
  trainer.pokemons.push(pokemon);
  console.log("logTrainerPushed: " + JSON.stringify(trainer));
  console.log(trainer);

  configData = {
    method: 'post',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trainer)
  };
  return fetch(TRAINERS_URL, configData)
    .then(function(res) { return res.json()})
    .then(function(json) {console.log(data)})
    .catch((err)=>console.log(err));
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function catchPokemon(trainer_id){
  let newPokemon = {};

  newPokemon["species"] = pokemonJsonVar[Math.floor(Math.random() * 28)]["species"];
  newPokemon["nickname"] = "Test";

  fetch("http://faker.hook.io/")
    .then(function(res) { return res.json()})
    .then(function(json) {
      newPokemon["nickname"] = json;
    }).catch();

  wait(2000); //make syncronous instead

  newPokemon["trainer_id"] = trainer_id;
  console.log(newPokemon["nickname"]);
  let formData = {pokemons:{
      //id: null,
      species: newPokemon["species"],
      nickname: newPokemon["nickname"],
      trainer_id: newPokemon["trainer_id"]
    }
      //created_at: Date(),
      //updated_at: null}

  }

  let configData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }

  return fetch(POKEMONS_URL, configData)
  .then(function(res) { return res.json()})
  .then(function(json) {
      //console.log(json);

      newPokemon["pokemonId"] = json["id"];
      console.log(`newPokemon["pokemonId"] : ` + newPokemon["pokemonId"]);
      console.log(`newPokemon["trainer_id"] : ` + newPokemon["trainer_id"]);
      //postPokemon(newPokemon, trainer_id);
      doCards();

    })
    .catch(function(err){console.log(err)});

}

function addPokemon(){
  console.log("add clicked");

  if (this.parentElement.lastElementChild.childElementCount < 6){ //if there are < 7 pokemon/li elements
    catchPokemon(this.getAttribute('data-trainer-id'));//get a pokemon //fetch post to add pokemon to
  }

}
function doRemove(id){
  console.log("remove clicked");
  //this.parentElement.lastElementChild.childElementCount < 6

  let configData = { method: 'DELETE' }

  console.log(`data-p-id : ${id}`);
  return fetch(POKEMONS_URL + "/" + id, configData)
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
    .catch();
}
function removePokemon(){
  doRemove(this.getAttribute('data-pokemon-id'));
  doCards();
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
