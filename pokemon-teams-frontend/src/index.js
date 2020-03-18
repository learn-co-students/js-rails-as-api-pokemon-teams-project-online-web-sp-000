const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let trainers = []
function insertTrainers() {
    for (trainer of trainers) {
        const trainerDiv = document.createElement("div")
        trainerDiv.className = "card"
        let trainerIdString = trainer["id"].toString()
        trainerDiv.setAttribute('data-id', trainerIdString) 
        const trainerNamePElm = document.createElement("p")
        trainerNamePElm.innerHTML = trainer["attributes"]["name"]
        trainerDiv.appendChild(trainerNamePElm)
        const pokemonButton = document.createElement("button")
        pokemonButton.setAttribute('data-trainer-id', trainerIdString)
        pokemonButton.innerHTML = "Add Pokemon"
        trainerDiv.appendChild(pokemonButton)
        document.querySelector("main").appendChild(trainerDiv)
        const pokemonUl = document.createElement("ul")
        trainerDiv.appendChild(pokemonUl)

    }
}
document.addEventListener("DOMContentLoaded", () => {
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(function(object) {
            trainers = Object.values(object["data"])
            insertTrainers()
        })
    
})