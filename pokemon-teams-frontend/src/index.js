const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  console.log("The DOM has loaded");
});

function createTrainerObject(trainerID){
  let myGetObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(trainerID)
  };
  return myGetObject;
};

function newPokemonRequest(element, configObj){
  return fetch(POKEMONS_URL, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            // console.log("this is what was returned for newPokemonRequest")
            // console.log(object)
            // console.log(object.data.attributes);
            appendPokemon(element, object);
          })
          .catch(function(error) {
            console.log(error.message);
          });
}

function appendPokemon(element, object){
  // console.log("appendPokemon");
  // console.log(element);
  // console.log(element.pokemons);
  // console.log(element.id)
  // console.log("ul-id" + element.id);
  let myList = document.getElementById('ulid' + element.id)
  // console.log("found list")
  // console.log(myList);
  myList.appendChild(createPokemon(object.data.id, object.data.attributes.nickname, object.data.attributes.species));
}

function getNewPokemon(element){
  let myTrainer = {};
  myTrainer.trainer_id = element.id;
  // console.log(myTrainer);
  let myPost = newPokemonRequest(element, createTrainerObject(myTrainer));
  return myPost;
};

function getRequest(configObj){
  return fetch(TRAINERS_URL, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            // console.log("this is what was returned")
            // console.log(object);
            listTrainers(object);
          })
          .catch(function(error) {
            console.log(error.message);
          });
};

function createGetObject(){
  let myGetObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  return myGetObject;
};

function getTrainers(){
  let myPost = getRequest(createGetObject());
  return myPost;
};

function listTrainers(list){
  list.forEach(displayTrainer);
}

function displayTrainer(element, index){
  let trainerList = document.getElementById('trainer-collection');
  trainerList.appendChild(createCard(element));
};

function createCard(element){
  // console.log("create Card")
  let newTrainer = document.createElement("div");
  newTrainer.setAttribute("class", "card");
  newTrainer.setAttribute("data-id", element.id)
  let newElement = document.createElement("p");
  newElement.innerHTML = element.name;
  newTrainer.appendChild(newElement);

  newElement = document.createElement("button");
  newElement.setAttribute("data-trainer-id", element.id);  
  newElement.innerText = "Add Pokemon";
  newElement.addEventListener("click", () => {
    // console.log(element)
    // console.log("addPokemon");
    getNewPokemon(element);
  });
  newTrainer.appendChild(newElement);
  newTrainer.appendChild(createPokemons(element.id, element.pokemons));
  return newTrainer;
};

function createPokemons(id, list){
  let myElement = document.createElement("ul")
  myElement.setAttribute("id", "ulid" + id);
  for (x = 0; x < list.length; x++){
    myElement.appendChild(createPokemon(list[x].id, list[x].nickname, list[x].species));
  }
  return myElement;
}

function createPokemon(id, nickname, species){
  let myListItem = document.createElement("li")
  myListItem.innerHTML = nickname + " (" + species + ") ";
  let myButton = document.createElement("button");
  myButton.setAttribute("data-pokemon-id", id);
  myButton.setAttribute("class", "release");
  myButton.innerText = "Release";
  myButton.addEventListener("click", () => {
    console.log(myButton.getAttribute("data-pokemon-id"));
    console.log("Release Clicked");
    console.log(myListItem);
    removePokemon(id, myListItem);
    // myListItem.remove();
  })
  myListItem.appendChild(myButton);
  return myListItem;
}

function removeRequest(id, listItem, configObj){
  return fetch(POKEMONS_URL + '/' + id, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            // console.log("this is what was returned")
            // console.log(object);
            listItem.remove();
          })
          .catch(function(error) {
            console.log(error.message);
          });
};

function createRemoveObject(){
  let myGetObject = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  return myGetObject;
};

function removePokemon(id, listItem){
  let myPost = removeRequest(id, listItem, createRemoveObject());
  return myPost;
};

getTrainers();
