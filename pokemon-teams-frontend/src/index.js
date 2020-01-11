'use strict';

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let trainerCard;

function run() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => 
        json.forEach(trainer => {
            createTrainerCard(trainer)
        })
    );
}

function createTrainerCard(trainer) {
    //create card
    trainerCard = document.createElement("div");
    trainerCard.classList.add('card');
    trainerCard.setAttribute("data-id", trainer.id)
    //add trainer profile
    addTrainer(trainer);
     //add 'add pokemon' button
     let ul = document.createElement('ul');
     addPokemonButton(trainer, ul);
    //add pokemon profiles
    trainer.pokemons.forEach(pokemon => {
        addPokemon(pokemon, ul);
    })
    trainerCard.appendChild(ul)
    //add trainer card
    document.querySelector('main').appendChild(trainerCard); 
}

function addTrainer(trainer) {
    let p = document.createElement('p');
    let name = document.createTextNode(trainer.name)
    p.appendChild(name)
    trainerCard.appendChild(p);
}

function addPokemon(pokemon, ul) {
    let li = document.createElement('li');
    li.innerHTML = pokemon.nickname + " " + "(" + pokemon.species + ")";
    addReleaseButton(pokemon, li);
    ul.appendChild(li);
}

function addReleaseButton(pokemon, li) {
    let button = document.createElement("button");
    button.innerHTML = "Release";
    button.classList.add("release");
    button.setAttribute("data-pokemon-id", pokemon.id)
    li.appendChild(button);
    button.addEventListener('click', function() {
        removePokemon(pokemon);
        li.remove();
    });
}

function addPokemonButton(trainer, ul) {
    let button = document.createElement('button');
    button.innerHTML = "Add Pokemon";
    button.setAttribute("data-trainer-id", trainer.id)
    trainerCard.appendChild(button);
    button.addEventListener('click', function() {
        newPokemon(trainer, ul)
    });
}

function removePokemon(pokemon) {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({id: pokemon.id})
    })
}

function newPokemon(trainer, ul) {
    if (ul.childElementCount < 6) {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: trainer.id,
                name: trainer.name, 
            })
        }) .then(res => res.json())
        .then((poke) => {
            console.log(poke)
          addPokemon(poke, ul)
        })
    } else {
        console.log('heck no')
    }
}

function addPokemonToUl(trainer) {
    trainer.pokemons.forEach(pokemon => {
        addPokemon(pokemon, ul);
    })
}

run()

