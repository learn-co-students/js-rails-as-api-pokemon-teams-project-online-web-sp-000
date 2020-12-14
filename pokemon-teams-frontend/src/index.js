/*
    User Stories:
    
    - When a user loads the page, they should see all trainers, 
    with their current team of Pokemon.
    - Whenever a user hits "Add Pokemon" and they have space on 
    their team, they should get a new Pokemon.
    - Whenever a user hits "Release Pokemon" on a specific Pokemon 
    team, that specific Pokemon should be released from the team.
*/
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => getTrainers())

const getTrainers = () => {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(json => {
            json.forEach(trainer => renderTrainer(trainer))
        })
}

const renderTrainer = (trainer) => {
    const card = document.createElement("div")
    const nameTag = document.createElement("p")
    const addButton = document.createElement("button")
    const pokemonList = document.createElement("ul")

    card.setAttribute("class", "card")
    card.setAttribute("data-id", trainer.id)
    nameTag.innerText = trainer.name
    addButton.setAttribute("data-trainer-id", trainer.id)
    addButton.innerText = "Add Pokemon"
        // attatch event listener to button(click)
    addButton.addEventListener("click", createPokemon)
    trainer.pokemons.forEach(pokemon => pokemonList.appendChild(renderPokemons(pokemon)))
    card.appendChild(nameTag)
    card.appendChild(addButton)
    card.appendChild(pokemonList)
    main.appendChild(card)
}

const renderPokemons = (pokemon) => {
    const div = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerText = "Release"
    button.addEventListener("click", releasePokemon)
    li.appendChild(button)
    return li
}

const createPokemon = () => {
    debugger
}

const releasePokemon = () => {}