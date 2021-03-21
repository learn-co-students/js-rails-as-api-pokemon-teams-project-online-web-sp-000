const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainers = fetch(TRAINERS_URL)
.then(function(response) {
  return response.json();
})
.then(function(json){
  addTrainerCards(json);
});

function addTrainerCards(json) {
    const trainers = json.data;

    for (const trainer of trainers) {
        const name = trainer.attributes.name;
        const id = trainer.id;
        
        const main = document.getElementsByTagName('main')[0];

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', id);

        const nameP = document.createElement('p');
        nameP.innerText = name;

        const addButton = document.createElement('button');
        addButton.setAttribute('data-trainer-id', id);
        addButton.innerText = "Add Pokemon";
        addButton.addEventListener('click', addPokemon)

        const pokemonList = renderPokemonList(trainer.id);
        
        card.append(nameP, addButton, pokemonList);

        main.append(card);
    }
}

function renderPokemonList(trainerId){
    const pokemonList = document.createElement('ul');

    fetch(`${TRAINERS_URL}/${trainerId}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        const trainerPokemon = json.included;

        for (const pokemon of trainerPokemon) {
            const listItem = document.createElement('li');
            const releaseButton = document.createElement('button');
            releaseButton.className = 'release';
            releaseButton.setAttribute('data-pokemon-id', pokemon.id);
            releaseButton.innerText = "Release";
            releaseButton.addEventListener('click', releasePokemon);
    
            listItem.innerHTML = `${pokemon.attributes.nickname} (${pokemon.attributes.species}) `
            listItem.appendChild(releaseButton);
    
            pokemonList.appendChild(listItem);
        }    
    });
      
    return pokemonList;
}

function addPokemon(e){
    const trainerId = e.target.getAttribute('data-trainer-id');

    fetch(`${TRAINERS_URL}/${trainerId}/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
    })
    .then(function(response) {
        const currentPokemonList = e.target.nextSibling;
        updatePokemonList(trainerId, currentPokemonList);
    });
}

function releasePokemon(e){   
    const pokemonId = e.target.getAttribute('data-pokemon-id');

    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
    })
    .then(function(response) {
        const trainerId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
        const currentPokemonList = e.target.parentElement.parentElement;
        updatePokemonList(trainerId, currentPokemonList);
    });
}

function updatePokemonList(trainerId, currentPokemonList) {
    const newPokemonList = renderPokemonList(trainerId);
    currentPokemonList.replaceWith(newPokemonList);
}