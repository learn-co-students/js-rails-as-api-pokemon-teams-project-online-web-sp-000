const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", () => loadTrainers())

const loadTrainers = () => {
    const TRAINERS_URL = `${BASE_URL}/trainers`
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
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
    // attach even listener to button (click)
    buttong.addEventListener("click", createPokemon)

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
    button.setAttribute("button", "release")
    button.setAttribute("data-pokemon-id", `${pokemon.id}`)
    button.innerHTML = "Release"
    // attach event listener to button (click)
    button.addEventListener("click", deletePokemon)

    li.appendChild(button)
    ul.appendChild(li)

}

const createPokemon = () => {

}

const deletePokemon = () => {

}