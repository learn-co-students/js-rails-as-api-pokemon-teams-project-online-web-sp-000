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
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', trainer.id)

    const p = document.createElement("p");
    p.innerText = trainer.name

    const btn = document.createElement("button");
    btn.setAttribute("data-trainer-id", trainer.id);
    btn.innerText = "Add Pokemon";

    const ul = document.createElement("ul");
    div.append(p, btn, ul);
    main.append(div);

    trainer.pokemons.forEach(pokemon => {
        renderPokemon(pokemon)
    })

    btn.addEventListener("click", addPokemon);
}

function renderPokemon(pokemon) {
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li");
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    ul.append(li);

    const releaseBtn = document.createElement("button");
    releaseBtn.setAttribute("class", "release");
    releaseBtn.setAttribute("data-pokemon-id", pokemon.id);
    releaseBtn.innerText = "Release";
    li.append(releaseBtn);

    releaseBtn.addEventListener('click', releasePokemon)
    
}

function addPokemon(e) {
    e.preventDefault()
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId
        })
    };

    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(json => {
        if (json.message){
            alert(json.message)
        } else {
            renderPokemon(json)
        }
    })
}

function releasePokemon(e) {
    e.preventDefault()
    let conObj = {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, conObj)
    e.target.parentElement.remove()
};