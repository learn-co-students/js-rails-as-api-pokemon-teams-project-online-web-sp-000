const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const renderTrainer = trainer => {
    const div = document.createElement('div')
    const button = document.createElement('button')
    const ul = document.createElement('ul')
    const p = document.createElement('p')

    div.dataset.id = trainer.id
    div.className = "card"
    p.textContent = trainer.name
    button.innerText = "Add Pokemon"
    button.dataset.trainerId = trainer.id

    button.addEventListener('click', createPokemon)

    div.append(p, button, ul)

    const main = document.querySelector('main')
    main.append(div)
    trainer.pokemons.forEach(pokemon => {
        renderPokemon(pokemon, ul)
    })
}

const renderPokemon = (pokemon, ul) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const list = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    button.className = "release"
    button.dataset.id = pokemon.id
    button.innerHTML = "Release"
    button.addEventListener("click", deletePokemon)

    li.appendChild(button)
    list.appendChild(li)
}

const createPokemon = (e) => {
    e.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ trainer_id: e.target.dataset.trainerId })
    }
    fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(json => {
            if (json.message) {
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
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.id}`, configObj)
    e.target.parentElement.remove()
}

const loadTrainers = () => {
    fetch(TRAINERS_URL)
        .then(r => r.json())
        .then(trainersArray => {
            trainersArray.forEach(trainer => {
                renderTrainer(trainer)
            });
        })
}

document.addEventListener("DOMContentLoaded", () => loadTrainers())