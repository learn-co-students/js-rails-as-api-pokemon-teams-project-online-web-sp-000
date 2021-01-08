const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const pokemonTeamsContainer = document.querySelector('main')
const trainerCards = document.querySelectorAll('.card')


document.addEventListener("DOMContentLoaded", () => {
    console.log("dom has loaded");
    getTrainers();
});

function getTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => {
        json.forEach(trainer => renderTrainer(trainer))});
}   

function renderTrainer(trainer) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const addButton = document.createElement('button')
    const ul = document.createElement('ul')

    div.setAttribute('class', 'card')
    div.setAttribute('data-id', trainer.id)
    p.innerHTML = trainer.name
    addButton.setAttribute('data-trainer-id', trainer.id)
    addButton.innerHTML = 'Add Pokemon'

    addButton.addEventListener('click', createPokemon)

    div.appendChild(p)
    div.appendChild(addButton)
    div.appendChild(ul)

    pokemonTeamsContainer.appendChild(div)
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

function renderPokemon(pokemon) {
    const ul = document.querySelector(`div[data-id='${pokemon.trainer_id}']`)
    const li = document.createElement('li')
    const releaseButton = document.createElement('button')

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    releaseButton.setAttribute('class', 'release')
    releaseButton.setAttribute('data-pokemon-id', pokemon.id)
    releaseButton.innerHTML = 'Release'

    releaseButton.addEventListener('click', deletePokemon)

    li.appendChild(releaseButton)
    ul.appendChild(li)

}

function createPokemon(e) {
    e.preventDefault()
    const configObj = {
        method: 'POST',
        headers: {
            'ContentType': 'application/json',
            // 'Accept': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: e.target.dataset.trainerId
        })
    }
    fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => {
        if(json.message) { 
            alert(json.message)
        } else { 
            renderPokemon(json)
        }
    })
}

function deletePokemon(e) {
    e.preventDefault()
    const configObj = {
        method: 'DELETE',
        headers: {
            'ContentType': 'application/json',
            // 'Accept': 'application/json'
        }
    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
    e.target.parentElement.remove()
}