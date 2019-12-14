const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// sample card for each trainer
let card;
let main = document.body.querySelector("main")

document.addEventListener('DOMContentLoaded', () =>{
  // loads all cards from the my Rails API
  addTrainers()
});


function addTrainers() {
  fetch('http://localhost:3000/trainers/')
    .then(response => {
      return response.json();
    })
    .then(trainers => {
      trainers.data.forEach(pokemonTrainer =>{
        populateTrainerElements(pokemonTrainer);
      })
    });
}

// need a function for adding pokemons to the correct Trainer

function populateTrainerElements(trainer) {
  let trainerId = trainer.id
  let trainerName = trainer.attributes.name
  let trainerPokemons = trainer.attributes.pokemons
  let trainerCard = document.createElement("div");

  trainerCard.className = "card";
  trainerCard.setAttribute('data-id', `${trainerId}`);
  trainerCard.innerHTML =
  `<p>${trainerName}</p>
  <button data-trainer-id="${trainerId}">Add Pokemon</button>
   <ul>

   </ul>`
   main.appendChild(trainerCard)

   trainerPokemons.forEach(pokemon =>{
     let pokeLi = document.createElement("li")
     pokeLi.innerHTML =
     `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
     let pokeUl = trainerCard.querySelector("ul");
     pokeUl.appendChild(pokeLi);
   })

   addFunctionality(trainerCard);
}


function addFunctionality(card) {
  card.addEventListener("click", event => {
    // grabs the pokemon id that needs to be released
    if (event.target.getAttribute("data-pokemon-id") != null) {
      // removes DOM
      let ulParent = event.target.parentNode.parentNode;
      ulParent.removeChild(event.target.parentNode);
      // updates DB
      removePokemon(event.target.getAttribute("data-pokemon-id"))
    } else if (event.target.getAttribute("data-trainer-id") != null) {
      if (event.target.parentNode.querySelector("ul").childElementCount < 8) {
        addRandomPokemon(event.target.getAttribute("data-trainer-id"))
         .then(pokemon => {
           console.log(pokemon)
           let pokemonUl = event.target.parentNode.querySelector("ul");
           let pokemonLi = document.createElement("li");
           pokemonLi.innerHTML =
           `${pokemon.data.attributes.nickname} (${pokemon.data.attributes.species}) <button class="release" data-pokemon-id="${pokemon.data.id}">Release</button>`
           pokemonUl.appendChild(pokemonLi);
         });
      } else {
        console.log("Max Pokemons Reached!");
      }
    }
  })
}

/////////////////////////////

function addRandomPokemon(trainerId) {
  // only run this function if trainer has less than 8 pokemons
  let formData = {
    trainer_id: trainerId
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  return fetch('http://localhost:3000/pokemons', configObj)
    .then(response =>{
      return response.json()
    })
}

function removePokemon(pokemonId) {
  let formData = {
    pokemonId: pokemonId
  };

  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  return fetch(`http://localhost:3000/pokemons/${pokemonId}`, configObj)
    .then(response =>{
      return response.json()
    })
    .then(json => {
      console.log(json)
    })
}
// need a function for releasing pokemons
