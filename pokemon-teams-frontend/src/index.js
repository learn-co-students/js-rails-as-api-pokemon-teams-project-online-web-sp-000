const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let trainers = []
let pokemons = []

function insertTrainers() {
    for (trainer of trainers) {
        const trainerDiv = document.createElement("div")
        trainerDiv.className = "card"
        let trainerIdString = trainer["id"].toString()
        trainerDiv.setAttribute('data-id', trainerIdString) 
        const trainerNamePElm = document.createElement("p")
        trainerNamePElm.innerHTML = trainer["attributes"]["name"]
        trainerDiv.appendChild(trainerNamePElm)
        const addPokemonButton = document.createElement("button")
        addPokemonButton.setAttribute('data-trainer-id', trainerIdString)
        addPokemonButton.innerHTML = "Add Pokemon"
        addPokemonButton.className = "add-pokemon-button"
        trainerDiv.appendChild(addPokemonButton)
        addPokemonButton.addEventListener("click", () => {
            addPokemon(trainerIdString)
        })
        document.querySelector("main").appendChild(trainerDiv)
        const pokemonUl = document.createElement("ul")
        trainerDiv.appendChild(pokemonUl)
    }
}

function deletePokemonFromDatabase(pokemonId){
    let configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "id": pokemonId
        })
      };
    fetch(`http://localhost:3000/pokemons/${pokemonId}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
            console.log(object);
        })
        .catch(function(error) {
            console.log(error.message);
        }); 
}

function removePokemonLi(pokemon_id) {
    deletePokemonFromDatabase(pokemon_id)
    let element = document.querySelector(`#pokemon-${pokemon_id}`)
    element.parentNode.removeChild(element);
}

function insertNewPokemonLi(pokemon){
    const pokemonLi = document.createElement("li")
    pokemonLi.innerHTML = `${pokemon["attributes"]["nickname"]} (${pokemon["attributes"]["species"]})`
    pokemonLi.id = `pokemon-${pokemon["id"]}`
    const trainerNum = pokemon["attributes"]["trainer_id"]
    document.querySelector(`[data-id='${trainerNum}'] ul`).appendChild(pokemonLi)
    const releaseButton = document.createElement("button")
    releaseButton.className = "release"
    releaseButton.setAttribute("data-pokemon-id", pokemon["id"])
    releaseButton.innerHTML = "Release"
    pokemonLi.appendChild(releaseButton)
    releaseButton.addEventListener("click", () => {
        removePokemonLi(pokemon["id"])
    })
}

function insertAllPokemonLis(){
    for (pokemon of pokemons) {
        insertNewPokemonLi(pokemon)
    }
}

function addPokemon(trainerId){
    let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": trainerId
        })
      };
    fetch("http://localhost:3000/pokemons", configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
            insertNewPokemonLi(object["data"]);
        })
        .catch(function(error) {
            console.log(error.message);
        }); 
}

document.addEventListener("DOMContentLoaded", () => {
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(function(object) {
            trainers = Object.values(object["data"])
            insertTrainers()
        })
})

document.addEventListener("DOMContentLoaded", () => {
    fetch(POKEMONS_URL)
        .then(response => response.json())
        .then(function(object) {
            pokemons = Object.values(object["data"])
            insertAllPokemonLis()
        })
})

