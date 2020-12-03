const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")

const loadTrainers = () => {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(trainer => renderTrainer(trainer))

    })
}

const renderTrainer = (trainerHash) => {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")

    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainerHash.id)

    p.innerHTML = trainerHash.name
    
    button.setAttribute("data-trainer-id", trainerHash.id)
    button.innerHTML = "Add Pokemon"
    button.addEventListener("click", createPokemon)
    // attach event listener to button (click)

    ul.setAttribute("id", trainerHash.id)

    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)

    main.appendChild(div)

    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) => {
    const ul = document.getElementById(pokemon.trainer_id)
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

    button.innerHTML = "Release"
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.addEventListener("click", deletePokemon)

    
    ul.appendChild(li)
    li.appendChild(button)
}

const createPokemon = (event) => {
    event.preventDefault()
    const configObj = {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => {
        if (json.message){
            alert(json.message)   
        } else {
            renderPokemon(json)
        }
    })
}

const deletePokemon = (event) => {
    event.preventDefault()
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj)
    event.target.parentElement.remove()
}

document.addEventListener("DOMContentLoaded", loadTrainers)
