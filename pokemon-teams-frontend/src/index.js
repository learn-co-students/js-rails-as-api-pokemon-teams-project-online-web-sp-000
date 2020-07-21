const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const mainBody = document.querySelector('main');

function addPokemon(listOfPokemon, trainer) {
    if(listOfPokemon.childElementCount < 6) {
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify( { trainer_id: trainer.id } )
        };

        return fetch(POKEMONS_URL, configObj).then((response) => { return response.json() }).then((pokemon) => {
            listOfPokemon.append(buildPokemonList(pokemon))
        });
    }
}

function deletePokemon(pokemonList) {
    const pokemonId = pokemonList.querySelector("button").getAttribute("data-pokemon-id");

    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    return fetch(POKEMONS_URL + `/${pokemonId}`, configObj).then((response) => { return response.json() }).then((pokemon) => {
        pokemonList.remove();
    });
}

function buildPokemonList(pokemon) {
    const pokemonList = document.createElement("li")
    pokemonList.innerHTML =
        `${pokemon.nickname} (${pokemon.species})` +
        `<button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
    const releasePokemonButton = pokemonList.querySelector("button")
    releasePokemonButton.addEventListener('click', () => { deletePokemon(pokemonList) });
    return pokemonList
}

function buildCardBase(trainer) {
    const card = document.createElement("div")
    card.setAttribute("class", "card")
    card.setAttribute("data-id", trainer.id)
    card.innerHTML =
        `<p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul></ul>`
    return card
}

function buildTrainerCards(json) {
    for(const trainer of json) {
        const card = buildCardBase(trainer)
        const listOfPokemon = card.querySelector("ul")
        const addPokemonButton = card.querySelector("button")

        for(const pokemon of trainer.pokemon) {
            listOfPokemon.append(buildPokemonList(pokemon))
        }

        addPokemonButton.addEventListener('click', () => { addPokemon(listOfPokemon, trainer) });
        mainBody.append(card)
    }
}

function loadTrainerCards(url) {
    return fetch(url).then((response) => { return response.json() }).then((json) => { buildTrainerCards(json) });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTrainerCards(TRAINERS_URL);

});
