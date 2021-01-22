// const { response } = require("express");

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('main');

    getTrainers();

function getTrainers() {
return fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => {
            console.log(trainers.data)
            renderTrainers(trainers.data)
        })
}

function getNewPokemon(trainer_id) {

 return fetch(POKEMONS_URL , {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
    trainer_id: trainer_id}
    )
})
.then(response => response.json())
.then(pokemon => {
    let newUL = document.getElementById(trainer_id);
    addPokemon(pokemon.data.attributes, newUL, pokemon.data.id);
})
}

function renderTrainers(trainers) {


    for (const trainer of trainers) {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.setAttribute('data-id', trainer.id);
        let p = document.createElement('p');
        p.innerText = trainer.attributes.name;
        let addBtn = document.createElement('button');
        addBtn.setAttribute('data-trainer-id', trainer.id);
        addBtn.innerText = "Add Pokemon";
        let pokemons = trainer.attributes.pokemons;
        let ul = document.createElement('ul');
        ul.setAttribute('id', trainer.id);
        addBtn.addEventListener('click', () => {

            if (ul.getElementsByTagName('li').length < 6) {
                getNewPokemon(trainer.id);
            }
});
        for (const pokemon of pokemons) {
            addPokemon(pokemon, ul, pokemon.id);
    }
    div.appendChild(p);
    div.appendChild(addBtn);
    div.appendChild(ul);
    container.appendChild(div);
    }

}

function addPokemon(pokemon, ul, pokemon_id) {
    let li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    let releaseBtn = document.createElement('button');
    releaseBtn.setAttribute('class', 'release');
    releaseBtn.setAttribute('data-pokemon-id', pokemon_id );
    releaseBtn.innerText = 'Release';

    releaseBtn.addEventListener('click', () => {
        
        
        releasePokemon(pokemon_id);
    ul.removeChild(li);
    })
    li.appendChild(releaseBtn);
    ul.appendChild(li);
}


function releasePokemon(id) {
     fetch(`${POKEMONS_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
    "Accept": "application/json"
        },
        'trainer_id': id
    })
}

});