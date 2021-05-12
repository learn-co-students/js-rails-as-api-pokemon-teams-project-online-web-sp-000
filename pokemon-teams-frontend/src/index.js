const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName("main")[0];

document.addEventListener("DOMContentLoaded", () => {

    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderAll(json));
});

function renderAll(jsonObject) {
    for (const trainer of jsonObject) {
        const div = document.createElement("div");
        div.className = "card";
        div.id = trainer.id;
        main.appendChild(div);
        addDetails(trainer);
    }
}

function addNewPokemon(trainer_id) {
    let formData = {
        "trainer_id": trainer_id
    };
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch(POKEMONS_URL, configObj)
    .then(response => response.json())
    .then(function(jsonPokemon){
        if (jsonPokemon.id) {
            addPokemon(jsonPokemon)
        }
    });

}

function addDetails(trainer) {
    const div = document.getElementById(trainer.id)

    const p = document.createElement("p");
    p.innerHTML = trainer.name
    div.appendChild(p);

    const button = document.createElement("button");
    button.innerHTML = "Add Pokemon";
    button.addEventListener("click", function (e) {
        addNewPokemon(trainer.id);
    });
    div.appendChild(button);

    const ul = document.createElement('ul');
    div.appendChild(ul);
    for (const pokemon of trainer.pokemons) {
        addPokemon(pokemon);
    }
}

function addPokemon(pokemon) {
    const div = document.getElementById(pokemon.trainer_id)
    const ul = div.lastChild;
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.className = "release";
    button.innerHTML = "Release";
    button.addEventListener("click", function(e) {
        removePokemon(pokemon);
        ul.removeChild(e.target.parentElement);
    });

    li.innerHTML = pokemon.nickname + " (" + pokemon.species + ")";
    li.appendChild(button);
    ul.appendChild(li);
    div.appendChild(ul);
}

function removePokemon(pokemon) {
    let configObj = { method: "DELETE" };
    fetch(POKEMONS_URL + "/" + pokemon.id, configObj);
}