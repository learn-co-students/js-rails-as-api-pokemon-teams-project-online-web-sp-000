const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

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

    ul.setAttribute("data-trainer-ul", trainerHash.id)

    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainerHash.id)
    // console.log("div", div) 
    p.innerHTML = trainerHash.name 
    button.setAttribute("data-trainer-id", trainerHash.id)
    button.innerHTML = "Add a Pokemon"
    button.addEventListener("click", createPokemon)

    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)

    main.appendChild(div)
    // console.log("trainerHash", trainerHash)
    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon)) 
} 

const renderPokemon = (pokemon) => {
    const ul = document.querySelector(`ul[data-trainer-ul='${pokemon.trainer_id}']`) 
    // console.log("ul", ul) 
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})` 
    button.setAttribute("class", "release") 
    button.setAttribute("data-pokemon-id", pokemon.id) 
    button.innerHTML = "Release" 
    button.addEventListener("click", deletePokemon)

    li.appendChild(button)
    ul.appendChild(li)
} 

const createPokemon = (e) => {
    e.preventDefault()
    // console.log("target", e.target.dataset)
    // debugger  
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: parseInt(e.target.dataset.trainerId)})
    }
    fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => {
        if (json.message){
            alert(json.message)
        } else {
            renderPokemon(json)
            console.log(json) 
        }
    })
}

const deletePokemon = (e) => {
    e.preventDefault()
    console.log(e.target.dataset)
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
    e.target.parentElement.remove()
}
