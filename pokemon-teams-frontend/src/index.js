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
    card.dataset.id = trainer.id;
    card.className = "card";
    cardName.innerHTML = name;
    card.appendChild(cardName);
    document.querySelector("main").appendChild(card)
    //create parse pokemon method
  }

}

//parse pokemon method
function parseTrainersPokemons(trainer) {
  const trainerPokemons = trainer.pokemons
  for (const pokemon of trainerPokemons) {
    let nickname = pokemon.nickname
    let species = pokemon.species
    //for each pokemon, add to trainer card addPokemonToTrainerCard(nickname, species, trainer.id)
  }
}

function addPokemonToTrainerCard() {
  let pokemonList = document.createElement("ul");
  let li = document.createElement("li");
}
//when a user hits add pokemon, and the trainer has space, trainer gets a random new pokeomn?
