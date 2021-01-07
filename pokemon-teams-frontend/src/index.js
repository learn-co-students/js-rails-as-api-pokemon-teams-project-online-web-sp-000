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

    li.appendChild(releaseButton)
    ul.appendChild(li)

}