const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// for each trainer returned by the trainer endpoint add trainer to card

//should probably do this in response to DOM loading

document.addEventListener("DOMContentLoaded", () => {
  //add method to feth all trainers
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
    button.dataset.trainerId = trainer.id;
    button.textContent = "Add Pokemon"
    card.dataset.id = trainer.id;
    card.className = "card";
    cardName.innerHTML = name;
    card.appendChild(cardName);
    card.appendChild(button);
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
    console.log(nickname, species, trainerId)
    addPokemonToTrainerCard(nickname, species, trainerId, pokemonId)
    //for each pokemon, add to trainer card addPokemonToTrainerCard(nickname, species, trainer.id)
  }
}

function addPokemonToTrainerCard(nickname, species, trainerId, pokemonId) {
  let pokemonList = document.createElement("ul");
  let li = document.createElement("li");
  console.log(li)
  let div = document.querySelector(`[data-id="${trainerId}"]`);
  let releaseButton = document.createElement("button");
  releaseButton.className = "release"
  releaseButton.dataset.pokemonId = pokemonId
  releaseButton.textContent = "Release"
  div.appendChild(li)
  li.textContent = `${nickname} (${species})`
  li.appendChild(releaseButton)
  //(${species})"
}

//create function to add
//when a user hits add pokemon, and the trainer has space, trainer gets a random new pokeomn?
