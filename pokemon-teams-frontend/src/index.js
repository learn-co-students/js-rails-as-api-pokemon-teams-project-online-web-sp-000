const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", fetchTrainers())

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(trainer => {
            renderTrainers(trainer)
        })
    })
}

function renderTrainers(trainer) {
    const main = document.querySelector("main")
    const div = document.createElement("div")
        div.className = "card"
        div.setAttribute("data-id", trainer.id)
    main.append(div)

    const p = document.createElement("p")
        p.innerHTML = trainer.name
    div.append(p)

    const addPokemonButton = document.createElement("button")
        addPokemonButton.innerHTML = "Add Pokemon"
        addPokemonButton.setAttribute("data-trainer-id", trainer.id)
        addPokemonButton.addEventListener("click", event => {
            addPokemon(trainer, event)
        })
    div.append(addPokemonButton)

    const ul = document.createElement("ul")
    div.append(ul)

    trainer.pokemons.forEach(pokemon => {
        const li = document.createElement("li")
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
        ul.append(li)

        const releasePokemonButton = document.createElement("button")
            releasePokemonButton.className = "release"
            releasePokemonButton.innerHTML = "Release"
            releasePokemonButton.setAttribute("data-pokemon-id", pokemon.id)
            releasePokemonButton.addEventListener("click", event => {
                releasePokemon(pokemon, event)
            })
        li.append(releasePokemonButton)
    })
}

function addPokemon(trainer, event) {
    const ul = event.target.parentElement.lastElementChild
    if (ul.children.length < 6) {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                "trainer_id": trainer.id
            })
        })
        .then(resp => resp.json())
        .then(newPokemon => {
            const li = document.createElement("li")
                li.innerHTML = `${newPokemon.nickname} (${newPokemon.species})`
            ul.append(li)

            const releasePokemonButton = document.createElement("button")
                releasePokemonButton.className = "release"
                releasePokemonButton.innerHTML = "Release"
                releasePokemonButton.setAttribute("data-pokemon-id", newPokemon.id)
                releasePokemonButton.addEventListener("click", event => {
                    releasePokemon(pokemon, event)
                })
            li.append(releasePokemonButton)
        })
    }
}

function releasePokemon(pokemon, event) {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(obj => {
        event.target.parentElement.remove()
    })
}