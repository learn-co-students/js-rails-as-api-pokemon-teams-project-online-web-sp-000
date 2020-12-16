const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    loadTrainers();
})

function loadTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderCards(json));
    // .then(json => console.log(json)); 
}

function renderCards(json) {
    json.forEach(trainer => {
        renderCard(trainer)
        // console.log(trainer)
    })
}

function renderCard(trainer) {
    const trainer_id = trainer.id;
    const main = document.getElementsByTagName('main')[0]; 

    const card = document.createElement('div'); 
    card.className = 'card'; 
    card.dataset.id = trainer_id

    const trainerName = document.createElement('p'); 
    trainerName.innerText = trainer.name; 
    
    const addPokemonBtn = document.createElement('button'); 
    addPokemonBtn.dataset.id = trainer_id; 
    addPokemonBtn.innerText = 'Add Pokemon'; 
    addPokemonBtn.addEventListener('click', addPokemon);

    const pokemonList = document.createElement('ul'); 
    
    main.appendChild(card); 
    card.appendChild(trainerName); 
    card.appendChild(addPokemonBtn); 
    card.appendChild(pokemonList); 
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, trainer_id))
    // trainer.pokemons.forEach(pokemon => console.log(pokemon))
}

function renderPokemon(pokemon, trainer_id) {
    const pokemonList = document.querySelector(`.card[data-id='${trainer_id}'] ul`); 
    const pokemonLi = document.createElement('li'); 
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
    const releaseBtn = document.createElement('button'); 
    releaseBtn.classList.add('release'); 
    releaseBtn.innerText = 'Release'; 
    releaseBtn.dataset.id = pokemon.id 
    releaseBtn.addEventListener('click', releasePokemon)
    pokemonList.append(pokemonLi);
    pokemonLi.append(releaseBtn);
}

function releasePokemon(event) {
    const pokemon_id = event.target.dataset.id
    const url = `${POKEMONS_URL}/${pokemon_id}`
    const configObj = {
        method: 'DELETE', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        // No need to have body, because we don't send nothing to the server.
       }
       // Make the HTTP Delete call using fetch api
    fetch(url, configObj)
    event.target.parentElement.remove();
}

function addPokemon(event) {
    console.log(event.target.dataset.id);
    const trainer_id = event.target.dataset.id;

    const configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainer_id
        })
       }
       // Make the HTTP Delete call using fetch api
    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(json => {
        if (json.message) {
            alert(json.message)
        } else {
            renderPokemon(json, trainer_id)
        }
    })
}