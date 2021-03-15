const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => loadTrainers())

// gets trainer info from backend API, converts into JSON, then passes each item as an arguement in renderTrainer function
const loadTrainers = () => {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(trainer => renderTrainer(trainer))
        })
}

// creates HTML elements for each trainer
const renderTrainer = (trainer) => {
    // create html elements
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")

    // assigns attributes to elements
    div.setAttribute("class", "card") // div class = card
    div.setAttribute("data-id", trainer.id) // div data-id = trainer.id- dynamically assigns ID
    p.innerText = trainer.name
    button.setAttribute("data-trainer-id", trainer.id)
    button.innerText = "Add Pokemon"

    // attaches event listener to "Add Pokemon" button -> sends request to faker gem 
    button.addEventListener("click", createPokemon)

    // attachs elements to div element
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)

    // attaches div to main
    main.appendChild(div)

    for (const pokemon of trainer.pokemons) {
        renderPokemon(pokemon)
    }
}

const renderPokemon = (pokemon) => {
    // creates ul specifically for this div associated w/ trainer id
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const button = document.createElement("button")

    // assigns pokemon element attributes
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerText = "Release"

    // adds event listener to "Release" button to remove pokemon from list
    button.addEventListener("click", deletePokemon)

    // attaches elements to parent elements
    li.appendChild(button)
    ul.appendChild(li)
}

// add's pokemon to trainer's pokemon list
const createPokemon = (e) => {
    // prevents page from executing default HTML
    e.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }

    fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(json => {
            // if json messaged passed through create method, show message. else, renderpokemon
            if (json.message){
                alert(json.message)
            } else {
                renderPokemon(json)
            }
        })
       // .catch()
}

// removes pokemon from trainer's pokemon list
const deletePokemon = (e) => {
    // prevents page from executing default HTML
    e.preventDefault()

    // no body because we don't need it - we're destroying an object
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }

    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
        .then(e.target.parentElement.remove())
    
}

