const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => loadTrainers())

const loadTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => { console.log(json)
        json.data.forEach(trainer => renderTrainer(trainer));
    })
}

const renderTrainer = (trainer) => {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const btn = document.createElement("button")
    const ul = document.createElement("ul")

    div.className = "card"
    div.setAttribute("data-id", trainer.attributes.id)

    p.innerText = trainer.attributes.name

    ul.setAttribute("data-id", trainer.attributes.id)

    btn.setAttribute("data-trainer-id", trainer.attributes.id)
    btn.innerText = "Add Pokemon"
    btn.addEventListener("click", createPokemon)

    div.appendChild(p)
    div.appendChild(btn)
    div.appendChild(ul)
    main.appendChild(div)

    trainer.attributes.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) => {
    const ul = document.querySelector(`ul[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const btn = document.createElement("button")
    
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    btn.className = "release"
    btn.setAttribute("data-pokemon-id", pokemon.id)
    btn.innerText = "Release"
    btn.addEventListener("click", releasePokemon)

    li.appendChild(btn)
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
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => {
        if (json.message){
            alert(json.message)
        } else {
            console.log(json)
            renderPokemon(json)
        }
        // console.log(json)
    })
}

const releasePokemon = (e) => {
    e.preventDefault()
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
    e.target.parentElement.remove()
}