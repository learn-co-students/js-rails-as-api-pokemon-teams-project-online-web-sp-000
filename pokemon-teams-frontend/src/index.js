const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    loadTeams();
});


function loadTeams() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(results => {
        results.data.forEach(trainer => addCard(trainer))
        results.included.forEach(pokemon => listPokemon(pokemon))
        console.log(results)
    });
}



function addCard(trainer){
    const main = document.getElementById('container')
    const card = document.createElement('div')
    const addButton = document.createElement('button');
    const pokemonList = document.createElement('ul')
    const trainerName = document.createElement('h1')

    card.className = "card"
    trainerName.innerText = trainer.attributes.name
    pokemonList.className = `pokemon-list-${trainer.id}`
    addButton.innerText = 'Add Pokemon'
    addButton.addEventListener("click", addPokemon);
    addButton.id = `data-trainer-id-${trainer.id}`
    main.appendChild(card)
    card.appendChild(trainerName)
    card.appendChild(addButton)
    card.appendChild(pokemonList)
}

function listPokemon(pokemon) {
    const ul = document.querySelector(`.pokemon-list-${pokemon.relationships.trainer.data.id}`)
    const li = document.createElement('li')
    const release = document.createElement('button')

    release.className = 'release'
    release.innerText = 'Release'
    release.id = `data-pokemon-id-${pokemon.id}`
    release.addEventListener("click", releasePokemon);
    li.innerHTML = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`

    li.appendChild(release)
    ul.appendChild(li)
}

function releasePokemon() {
    console.log(target)
}

function addPokemon() {
    console.log('pokemon added')
}