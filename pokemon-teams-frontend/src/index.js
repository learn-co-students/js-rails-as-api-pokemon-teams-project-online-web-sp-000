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
        // .catch(error => {
        //     alert(error.message)
        // })
}

const addPokemon = (pokeData) => {
    const addButton = document.querySelector(`button[data-trainer-id="${pokeData.trainer.id}"]`)
    const pokemonList = addButton.nextSibling
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerText = `${pokeData.nickname} (${pokeData.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokeData.id)
    button.innerText = "Release"
    li.appendChild(button)
    pokemonList.appendChild(li)
}

const releasePokemon = (event) => {
    event.preventDefault()
        /*
        #=> Example Request
            DELETE /pokemons/:pokemon_id
            
            #=> Example Response
            {"id":147,
            "nickname":"Gunnar",
            "species":"Weepinbell",
            "trainer_id":1}
         */
    const configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        // let pokemonsUrl = POKEMONS_URL.concat(`/${event.target.dataset.pokemonId}`)
    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj)
    event.target.parentElement.remove()
        // .then(pokeData => {
        //     debugger

    //     const releaseButton = document.querySelector(`
    // button[data - pokemon - id = "${pokeData.id}"]
    //     `)
    // //     const li = releaseButton.parentElement
    // //     const ul = li.parentElement
    // //     ul.removeChild(li)
    // // })
}