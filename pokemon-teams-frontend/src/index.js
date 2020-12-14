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
    addButton.addEventListener("click", createPokemon)
    trainer.pokemons.forEach(pokemon => pokemonList.appendChild(renderPokemons(pokemon)))
    card.appendChild(nameTag)
    card.appendChild(addButton)
    card.appendChild(pokemonList)
    main.appendChild(card)
}

const renderPokemons = (pokemon) => {
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

const createPokemon = (event) => {
    event.preventDefault()
    const trainerId = event.target.dataset.trainerId
    const trainerData = {
        trainer_id: Number(trainerId)
    }
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(trainerData)
    }
    fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(pokeData => {
            if (pokeData.message) {
                alert(pokeData.message)
            } else {
                addPokemon(pokeData)
            }
        })
}

const addPokemon = (pokemon) => {
    const div = document.querySelector(`div[data-id="${pokemon.trainer.id}"]`)
    const ul = div.children[2]
    const li = document.createElement("li")
    const button = document.createElement("button")
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerText = "Release"
    button.addEventListener("click", releasePokemon)
    li.appendChild(button)
    ul.appendChild(li)
}

const releasePokemon = (event) => {
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