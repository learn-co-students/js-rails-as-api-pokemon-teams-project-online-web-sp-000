const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", renderPokemonTeams());

function renderPokemonTeams(){
    const trainerUl = document.createElement("ul");
    const trainers = fetch("http://localhost:3000/trainers")
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => alert(error.message));

    trainers.forEach(trainer => function(trainer){
        const trainerLi = renderTrainer(trainer);
        const pokemonUl = document.createElement("ul");
        const pokemons = trainer.pokemons.forEach(pokemon => (){
            const pokemonLi = createLiForPokemon(pokemon);
            pokemonUl.appendChild(pokemonLi);
        });

        trainerLi.appendChild(pokemonUl);
        trainerList.appendChild(trainerUl);
    });
}

function createLiForPokemon(pokemon){
    const pokemonLi = document.createElement("li");
    pokemonLi.innerHTML = `${pokemon.name} (${pokemon.species})`;
    const releaseBtn = document.createElement("BUTTON");
    releaseBtn.class = "Release";
    releaseBtn.setAttribute('data-pokemon-id', pokemon.id);
    
    releaseBtn.addEventListener("click", removePokemon(pokemon));

    pokemonLi.appendChild(releaseBtn);
    return pokemonLi;
}

function removePokemon(pokemon){
    const pokemonLi = document.querySelectorAll(`[data-pokemon-id] = ${pokemon.id}`)[0];
    pokemonLi.remove();
    pokemon.trainer = nil;
}