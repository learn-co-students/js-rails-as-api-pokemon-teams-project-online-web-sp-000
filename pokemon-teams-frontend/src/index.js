const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", ()=>{
    loadTrainers()     
})

const loadTrainers = () => {
    fetch("http://localhost:3000/trainers")
    .then(response => response.json())
    .then(trainerList => {
        trainerList.forEach(trainer => renderTrainer(trainer))
    })
}

const renderTrainer = (trainer) => {
    const trainerDiv = document.createElement("div")
    const button = document.createElement("button")
    const ul = document.createElement("ul")
    const p = document.createElement("p")
    trainerDiv.setAttribute("class", "card")
    ul.setAttribute("class", "pokemon-list")
    trainerDiv.setAttribute("data-id", trainer.id)
    p.innerText = trainer.name
    button.setAttribute("data-trainer-id", trainer.id)
    button.innerText = "Add Pokemon"
    button.addEventListener("click", createPokemon) 


    trainerDiv.appendChild(p)
    trainerDiv.appendChild(button)
    trainerDiv.appendChild(ul)
    main.append(trainerDiv)
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}
        
 const renderPokemon = (pokemon) => {
    const pokemonList = document.querySelector(`div[data-id="${pokemon.trainer_id}"] .pokemon-list`)
    const newPoke = document.createElement("li")
    const newButton = document.createElement("button")

    newPoke.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    newButton.setAttribute("class", "release")
    newButton.setAttribute("data-pokemon-id", pokemon.id)
    newButton.innerHTML = "Release"
    newButton.addEventListener("click", releasePokemon)

    newPoke.appendChild(newButton)
    pokemonList.appendChild(newPoke)
 }

 const createPokemon = (event) => {
    event.preventDefault();

    const obj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
    }

    fetch(POKEMONS_URL, obj)
    .then(res => res.json())
    .then(json => {
        if (json.message) {
            alert(json.message)
        } else {
            renderPokemon(json)
        }
    })
    .catch(err => alert(`Dang it. You broke something! Here's why: ${err.message}`))
 }

 const releasePokemon = (event) => {
    event.preventDefault()
    event.target.parentNode.remove()
    const obj = {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    
    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, obj)       
 }