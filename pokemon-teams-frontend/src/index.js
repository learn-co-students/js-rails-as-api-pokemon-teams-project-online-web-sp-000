const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



// For each trainer make a div with card

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json))
}
function fetchTrainersPokemon(url, trainerId, trainerCard) {
    fetch(url + "/"+ trainerId)
    .then(resp => resp.json())
    .then(json => renderTrainersPokemon(json, trainerCard))
}

function renderTrainers(json) {
    const trainers = json.data
    const main = document.querySelector("main")
    main.innerHTML = ""
    for (trainer of trainers){

        const trainerCard = document.createElement("div")
        trainerCard.classList.add("card")
        
        const trainerHeading = document.createElement("h3")
        const trainerHeadingName = document.createTextNode(trainer.attributes.name)
        trainerHeading.appendChild(trainerHeadingName)
        
        const trainerAddPokemon = document.createElement("button")
        trainerAddPokemon.textContent = "Add Pokemon"
        trainerAddPokemon.id = trainer.id

        trainerAddPokemon.addEventListener("click", addTrainerPokemon)
        trainerCard.appendChild(trainerHeading)
        trainerCard.appendChild(trainerAddPokemon)
        
        main.appendChild(trainerCard)

        fetchTrainersPokemon(TRAINERS_URL, trainer.id, trainerCard)
        
        
        
    }
}

function renderTrainersPokemon(json, trainerCard){
    const pokemons = json.included
    for (pokemon of pokemons){
   
        const pokemonDiv = document.createElement("div")
        const pokemonDivSpan = document.createElement("span")
        const pokemonDivButton = document.createElement("button")

        pokemonDivSpan.textContent = `${pokemon.attributes.nickname} - ${pokemon.attributes.species}`
        pokemonDivButton.textContent = "Release"
        pokemonDivButton.id = pokemon.id
        
        pokemonDiv.appendChild(pokemonDivSpan)
        pokemonDiv.appendChild(pokemonDivButton)

        trainerCard.appendChild(pokemonDiv)
        pokemonDivButton.addEventListener("click",removePokemon)
    }
}

function addTrainerPokemon(e){
    //fetch post
    const trainerObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: e.target.id
        })
    }

    fetch(`${POKEMONS_URL}`, trainerObj)
    .then(resp => resp.text()).then(console.log)
    .then((obj) => {fetchTrainers()})
    .catch(error => {console.log(`Error: ${error}`)})
}


function removePokemon(e){
    console.log(e.target.id)
    //fetch post
    const pokemonObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: e.target.id
        })
    }
    fetch(`${POKEMONS_URL}/${e.target.id}`, pokemonObj)
    .then(resp => resp.text()).then(console.log)
    .then((obj) => {fetchTrainers()})
    .catch(error => {console.log(`Error: ${error}`)})
}

function renderNewTrainerPokemon(){
    console.log("render new poken")
}


fetchTrainers()