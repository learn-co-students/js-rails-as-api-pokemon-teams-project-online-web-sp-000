const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    getTrainers();
});

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(obj => {
        obj.forEach(trainer => renderTrainer(trainer))
    }) 
};

function renderTrainer(trainer) {
    const div = document.createElement("div");
    div.classname = "card";
    div.setAttribute('data-id', `${trainer['id']}`)

    const p = document.createElement("p");
    p.innerHTML = `${trainer['name']}`;

    const btn = document.createElement("button");
    btn.setAttribute("data-trainer-id", `${trainer['id']}`);
    btn.innerHTML = "Add Pokemon";

    const ul = document.createElement("ul");
    div.appendChild(p, btn, ul);
    main.appendChild(div);

    trainer['pokemons'].forEach(pokemon => {
        renderPokemon(pokemon, trainer.id)
    })

    btn.addEventListener("click", (e) => {
        addPokemon(trainer['id'])
    });
}

function renderPokemon(pokemon, trainerId) {
    const card = document.querySelectorAll(`[data-id="${trainerId}"]`)[0];
    const ul = card.getElementsByTagName("ul")[0];
    const li = document.createElement("li");
    li.innerHTML = `${pokemon['nickname']} (${pokemon['species']})`;
    ul.appendChild("li");

    releaseBtn = document.createElement("button");
    releaseBtn.setAttribute("class", "release");
    releaseBtn.setAttribute("data-pokemon-id", `${pokemon['id']}`);
    releaseBtn.innerHTML = "Release";
    li.appendChild(releaseBtn);

    releaseBtn.addEventListener('click', (event) => {
        releasePokemon(pokemon['id'], ul, li)
    });
}

function addPokemon(trainerId) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainerId": trainerId,
        })
    };

    fetch(POKEMONS_URL, configObj)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(pokemon) { renderPokemon(pokemon, trainerId) })
    .catch(function(error) {
        document.body.innerHTML = error.message;
    });
}

function releasePokemon(pokemon_id, ul, li) {
    let conObj = {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    fetch(`${POKEMONS_URL}/${pokemon_id}`, conObj)
    .then(function(resp) {
        return resp.json();
    })
    .then(function() {
        ul.removeChild(li);
    })
    .catch(function(error) {
        document.body.innerHTML = error.message;
    });
}