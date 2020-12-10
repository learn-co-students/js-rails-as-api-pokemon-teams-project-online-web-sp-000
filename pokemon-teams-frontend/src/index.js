const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//fetches trainer data from backend
document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers();
})

let releaseButtons = document.getElementsByClassName('release')

// fetch trainers from backend
function fetchTrainers() {
    return fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderTrainers(json));
}

//render DOM objects for trainers, add listneners
function renderTrainers(json) {
    const main = document.querySelector('main')

    json.forEach(trainer => {
        let div = document.createElement('div')
        //container ul for pokemons li's
        let list = document.createElement('ul')
        // Loop through pokemons for each trainer, creating li structure and id
        for (let i = 0; i < trainer.pokemons.length; i++) {
            let pokemonHTML = `${trainer.pokemons[i].nickname} (${trainer.pokemons[i].species}) <button class="release" data-pokemon-id="${trainer.pokemons[i].id}">Release</button>`
            let pokemonLi = document.createElement('li')
            pokemonLi.innerHTML = pokemonHTML
            list.appendChild(pokemonLi)
        }
        div.innerHTML = `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>${list.innerHTML}</ul>
        </div>`
        main.appendChild(div)
    })
    listenToButtons();
}

function listenToButtons() {
    const addButtons = document.getElementsByClassName('add')
    
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", function() {
            let trainerId = addButtons[i].getAttribute('data-trainer-id')
            fetchTrainerById(trainerId)
        })
    }
    releaseButtons = document.getElementsByClassName('release')
    for (let i = 0; i < releaseButtons.length; i++) {
        listenToReleaseButton(releaseButtons[i])
    }
}

function listenToReleaseButton(button) {
    button.addEventListener("click", function() {
        let pokemonId = button.getAttribute('data-pokemon-id')
        //fetch request method: DELETE TO DO
        let configObj = {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"id": pokemonId})
        }
        return fetch(POKEMONS_URL + `/${pokemonId}`, configObj)
        .then(response => response.json())
        .then(json => removePokemon(json))
    })
}

//fetch a trainer by Id to add a pokemon to the team
function fetchTrainerById(id) {
    return fetch(TRAINERS_URL+`/${id}`)
    .then(response => response.json())
    .then(json => addPokemon(json));
}

function addPokemon(json) {
    if (json.pokemons.length < 6) {        
        let configObj = {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"trainer_id": json.id})
        }
        return fetch(POKEMONS_URL, configObj)
        .then(response => response.json())
        .then(json => renderPokemon(json))
    } else {
        alert("Pokemon Team is Full!")
    }
}

function renderPokemon(json) {
    let list =  document.getElementsByClassName('card')[json.trainer_id - 1].childNodes[4]
    let pokemonHTML = `${json.nickname} (${json.species})<button class="release" data-pokemon-id="${json.id}">Release</button>`
    let pokemonLi = document.createElement('li')
    pokemonLi.innerHTML = pokemonHTML
    list.appendChild(pokemonLi)
    let button = pokemonLi.querySelector('button')
    listenToReleaseButton(button)
}

function removePokemon(json) {
    let buttons =  document.getElementsByClassName('card')[json.trainer_id - 1].childNodes[4].querySelectorAll('button')
    for (let i = 0; i < buttons.length; i++) {
        if (parseInt(buttons[i].getAttribute('data-pokemon-id')) === json.id) {
            buttons[i].parentElement.remove()
        }
    }
}
