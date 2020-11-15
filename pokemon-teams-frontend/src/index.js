const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function loadTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => parseTrainers(json));
};

function updateTrainer(trainer) {
    const pokemonList = document.querySelector(`div#card_${trainer.id} ul`);
    pokemonList.innerHTML = "";
    for (const pokemon of trainer.pokemons) {
        li = createPokemonButton(pokemon);
        pokemonList.appendChild(li);
    };
};

function addPokemon(trainerID) {
    let formData = {
        remove: false
    };

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch(`${TRAINERS_URL}/${trainerID}`, configObj)
    .then(resp => resp.json())
    .then(json => updateTrainer(json));
};

function removePokemon(pokemonID, trainerID) {
    let formData = {
        remove: true,
        pokemon_id: pokemonID
    };

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch(`${TRAINERS_URL}/${trainerID}`, configObj);
    let pokemon = document.getElementById(`pokemon_${pokemonID}`);
    pokemon.remove();
};

function createPokemonButton(pokemon) {
    let li = document.createElement('li');
    li.id = `pokemon_${pokemon.id}`;
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    let releaseButton = document.createElement('button');
    releaseButton.className = "release";
    releaseButton.id = `remove_button_${pokemon.id}`;
    releaseButton.innerText = "Release";
    releaseButton.addEventListener("click", () => {
        removePokemon(pokemon.id, pokemon.trainer_id);
    });
    li.appendChild(releaseButton);
    return li;
};

function parseTrainers(trainerData) {
    const main = document.getElementsByTagName('main')[0];
    for (const trainer of trainerData) {
        let trainerCard = document.createElement('div');
        trainerCard.id = `card_${trainer.id}`;
        trainerCard.className = "card";
        let p = document.createElement('p');
        p.innerText = trainer.name;
        trainerCard.appendChild(p);
        let addButton = document.createElement('button');
        addButton.className = "add";
        addButton.id = `add_button_${trainer.id}`;
        addButton.innerText = "Add Pokemon";
        addButton.addEventListener("click", () => {
            addPokemon(trainer.id);
        });
        trainerCard.appendChild(addButton);
        let pokemonList = document.createElement('ul');
        const pokemons = trainer.pokemons;
        for (const pokemon of pokemons) {
            let li = createPokemonButton(pokemon);
            pokemonList.appendChild(li);
        };
        trainerCard.appendChild(pokemonList);
        main.appendChild(trainerCard);
    };
};

document.addEventListener("DOMContentLoaded", () => {
    loadTrainers();
})