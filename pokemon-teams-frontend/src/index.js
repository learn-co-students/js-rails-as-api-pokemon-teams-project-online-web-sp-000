const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers(){
    const main = document.querySelector("main")
    removeAllChildNodes(main)
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => json.forEach(trainer => renderTrainerData(trainer)))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function renderTrainerData(trainerData){
    const main = document.querySelector("main")
    const trainerDiv = document.createElement("div")
    trainerDiv.classList.add("card")
    trainerDiv.id = trainerData.id
    const trainerName = document.createElement("h2")
    trainerName.innerText = trainerData.name
    trainerDiv.appendChild(trainerName)
    main.appendChild(trainerDiv)

    const catchButton = document.createElement("button")
    catchButton.innerText = "Add Pokemon"
    catchButton.addEventListener("click", e => {
        e.preventDefault()
        catchPokemon(trainerData.id)
    })
    trainerDiv.appendChild(catchButton)

    const pokemonList = document.createElement("ul")
    trainerDiv.appendChild(pokemonList)

    trainerData.pokemons.forEach(pokemon => {
        const li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        pokemonList.appendChild(li)
        const button = document.createElement("button")
        button.classList.add("release")
        button.innerText = "Release"
        button.addEventListener("click", e => {
            e.preventDefault()
            releasePokemon(pokemon.id)
        })
        li.appendChild(button)
    })
    // const trainD = trainerData
    // console.log(trainD)
}

function releasePokemon(pokemonId){
    const configObject = {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({pokemonId: pokemonId})
    }
    fetch(`${POKEMONS_URL}/${pokemonId}`, configObject)
    .then(fetchTrainers)
    .catch( function ( error ) {
        document.body.innerHTML = error.message
      } )
}

function catchPokemon(trainerId){
    const configObject = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({trainerId: trainerId})
    }
    fetch(POKEMONS_URL, configObject)
    .then(fetchTrainers)
    .catch( function ( error ) {
        document.body.innerHTML = error.message
      } )
}

document.addEventListener("DOMContentLoaded", fetchTrainers)
