const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", () => loadTrainers())

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
    p.innerText = trainerHash.name
    button.setAttribute("data-trainer-id", trainerHash.id)
    button.innerText = "Add Pokemon"
    button.addEventListener("click", createPokemon)

    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    main.appendChild(div)

    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
    
}

const renderPokemon = (pokemon) => {
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerText = "Release"
    button.addEventListener("click", deletePokemon)

    li.appendChild(button)
    ul.appendChild(li)



}

const createPokemon = (e) => {
    e.preventDefault()
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({trainer_id: e.target.dataset.trainerId
            })
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

const deletePokemon = (e) => {
    e.preventDefault()
    const configObj = {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
        "Accept": "application/json"
        }

    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
    e.target.parentElement.remove()
}