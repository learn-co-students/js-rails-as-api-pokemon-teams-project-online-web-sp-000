const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// for each trainer returned by the trainer endpoint add trainer to card

//should probably do this in response to DOM loading
let trainers
document.addEventListener("DOMContentLoaded", () => {
  retrieveTrainers()
  addTrainersToCards(trainers)
  parseTrainersPokemons(trainer)
  addPokemonToTrainerCard(nickname, species, trainerId, pokemonId)
  //createReleaseEvent(releaseButton)
});

function retrieveTrainers() {
   fetch("http://localhost:3000/trainers")
   .then(function(response){
     return response.json();
   })
   .then(function(json){
     console.log(json)
      trainers = json
     addTrainersToCards(trainers)
   })
}

//add trainers & their pokeomn to cards for object returned by retrieveTrainers
function addTrainersToCards(trainers) {
//assign trainer name as value to this element
  const allTrainers = trainers
  for (const trainer of allTrainers) {
    let card = document.createElement("div");
    let cardName = document.createElement("p");
    let name = trainer.name;
    let button = document.createElement("button");
    let pokemonList = document.createElement("ul");
    button.dataset.trainerId = trainer.id;
    button.textContent = "Add Pokemon"
    addPokemonButton(button)
    card.dataset.id = trainer.id;
    card.className = "card";
    cardName.innerHTML = name;
    card.appendChild(cardName);
    card.appendChild(button);
    card.appendChild(pokemonList);
    document.querySelector("main").appendChild(card)
    parseTrainersPokemons(trainer)
  }

}

//parse pokemon method
function parseTrainersPokemons(trainer) {
  const trainerPokemons = trainer.pokemons
  console.log(trainer.pokemons)
  for (const pokemon of trainerPokemons) {
    let pokemonTrainer = trainer
    let nickname = pokemon.nickname
    let species = pokemon.species
    let trainerId = pokemonTrainer.id
    let pokemonId = pokemon.id
    addPokemonToTrainerCard(nickname, species, trainerId, pokemonId)
    //for each pokemon, add to trainer card addPokemonToTrainerCard(nickname, species, trainer.id)
  }
}

function addPokemonToTrainerCard(nickname, species, trainerId, pokemonId) {
  //let pokemonList = document.createElement("ul");
  let li = document.createElement("li");
  let div = document.querySelector(`[data-id="${trainerId}"]`);
  let divUl = div.childNodes[2]
  let releaseButton = document.createElement("button");
  releaseButton.className = "release"
  releaseButton.dataset.pokemonId = `${pokemonId}`
  releaseButton.textContent = "Release"
  createReleaseEvent(releaseButton)
  divUl.appendChild(li)
  li.textContent = `${nickname} (${species})`
  li.appendChild(releaseButton)
}

function createReleaseEvent(releaseButton) {
  releaseButton.addEventListener("click", event => {
    console.log("you done clicked it!")
    let releasedPokemon = event.target.dataset.pokemonId
    event.target.parentElement.parentElement.removeChild(event.target.parentElement)
    releasePokemon(releasedPokemon)
  })
}

function releasePokemon(pokemon) {
  fetch(`http://localhost:3000/pokemons/${pokemon}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
    console.log(data) //maybe make error banner for this
  })
}

function addPokemonButton(button) {
  button.addEventListener("click", event => {
    console.log(event.target.dataset.trainerId)
    let trainer = event.target.dataset.trainerId
    if (event.target.nextSibling.childElementCount <= 6) {
      generateRandomPokemon(trainer)
      //add element to trainer card method
    }
    //otherwise do nothing
  })
}


function generateRandomPokemon(trainer) {
//post request to create pokemon endpoint
  let trainer_id = trainer
   return fetch("http://localhost:3000/pokemons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "trainer_id": `${trainer_id}`
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    //console.log(object)
    let nickname = object.nickname
    let species = object.species
    let trainerId = object.trainer_id
    let pokemonId = object.id
    //add pokemon information
    //let
    addPokemonToTrainerCard(nickname, species, trainerId, pokemonId)
  })

}
