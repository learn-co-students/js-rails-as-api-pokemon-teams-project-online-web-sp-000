const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main');

function trainerIndex(json) {
    for (const el of json) {
        const div = document.createElement('div');
        const button = document.createElement('button');
        const ul = document.createElement('ul');
        div.innerHTML = `<h1>${el.name}</h1>`;
        button.innerText = 'add pokemon';
        button.className = 'add';
        button.dataset.id = el.id;
        ul.id = el.name;
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
    }
}

function fetchPokemon(id) {
    return fetch(POKEMONS_URL, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainer_id: id
                })
            }).then(resp => resp.json()).then(obj => displayPokemon(obj));
}

function displayPokemon(obj) {
    const li = document.createElement('li');
    li.innerHTML = obj.species + '(' + obj.nickname + ')';
    document.getElementById(obj.trainer.name).appendChild(li);
}

function addPokemon() {
    const buttons = document.getElementsByClassName('add');
    for (const button of buttons) {
        button.addEventListener('click', function() {
            const trainer_id = button.dataset.id;
            fetchPokemon(trainer_id);
        });
    }
}

function pokemonIndex(json) {
    for (const el of json) {
        let li = document.createElement('li');
        li.innerHTML = el.species + '(' + el.nickname + ')';
        document.getElementById(el.trainer.name).appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => trainerIndex(json));

    fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then(json => pokemonIndex(json));

    setTimeout(addPokemon, 5000);
})