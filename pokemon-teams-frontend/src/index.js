const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// sample card for each trainer
let card;
let main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', function() {
    addTrainers();
});

function addTrainers() {
    fetch('http://localhost:3000/trainers/')
    .then(resp => resp.json()) //the callback function that takes in response as an argument.
    .then(trainers => {
        trainers.data.forEach(pokemonTrainer => {
            populateTrainerElements(pokemonTrainer);
        })
    });
}

function populateTrainerElements(trainer) {
    let trainerCard = document.createElement('div');
    trainerCard.className = "card";
    let trainerId = trainer.id
    trainerCard.setAttribute('data-id', `${trainerId}`)
    let trainerName = trainer.attributes.name
    let trainerPokemons = trainer.attributes.pokemons

    trainerCard.innerHTML = `<p>${trainerName}</p>
    <button data-trainer-id = "${trainerId}">Add Pokemon</button>
    <ul>

    </ul>`
    main.appendChild(trainerCard)

    trainerPokemons.forEach(pokemon => {
        let pokeLi = document.createElement('li')
        pokeLi.innerHTML =
        `${pokemon.nickname} (${pokemon.species}) <button class = "release" data-pokemon-id = "${pokemon.id}">Release</button>`
        let pokeUl = trainerCard.querySelector('ul');
        pokeUl.appendChild(pokeLi)
    })
    addFunctionality(trainerCard);
}

function addFunctionality(card) {
    card.addEventListener('click', event => {
        if (event.target.getAttribute('data-pokemon-id') != null) {
            let ulParent = event.target.parentNode.parentNode;
            ulParent.removeChild(event.target.parentNode);
            removePokemon(event.target.getAttribute("data-pokemon-id"))
        } else if (event.target.getAttribute(data-trainer-id) != null) {
            if (event.target.parentNode.querySelector("ul").childElementCount < 7) {
                addRandomPokemon(event.target.getAttribute("data-trainer-id"))
                .then(pokemon => {
                    console.log(pokemon)
                    let pokemonUl = event.target.parentNode.querySelector("ul");
                    let pokemonLi = document.createElement("li");
                    pokemonLi.innerHTML =
                    `${pokemon.data.attributes.nickname} (${pokemon.data.attributes.species}) <button class = "release" data-pokemon-id = "${pokemon.data.id}">Release</button>`
                    pokemonUl.appendChild(pokemonLi)
                });
            } else {
                console.log("Max pokemon reached!");
            }
        }
    })
}

function addRandomPokemon(trainerId) {
    let formData = {
        trainer_id: trainerId
    };
    let configobj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };
    return fetch('http://localhost:3000/pokemons', configobj)
    .then(resp => resp.json())
}

function removePokemon(pokemonId) {
    let formData = {
        pokemonId: pokemonId
    };
    let configobj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };
    return fetch(`http://localhost:3000/pokemons/${pokemonId}`, configobj)
    .then(resp = resp.json())
    .then(json => {
        console.log(json)
    })
}