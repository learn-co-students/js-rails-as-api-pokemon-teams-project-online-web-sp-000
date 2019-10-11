const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => json.forEach(function(trainer) {
        let trainerCard = document.createElement('div');
        trainerCard.className = "card";
        trainerCard.setAttribute("data-id", trainer.id);
        let p = document.createElement('p');
        p.innerHTML = trainer.name;
        let button = document.createElement('button');
        button.setAttribute("data-trainer-id", trainer.id);
        button.innerHTML = "Add Pokemon";
        button.addEventListener('click', addPokemon(trainer.id));
        let ul = document.createElement('ul');
        trainer.pokemons.forEach(function(pokemon, index) {
            let li = document.createElement('li');
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            let releaseButton = document.createElement('button');
            releaseButton.className = "release";
            releaseButton.setAttribute("data-pokemon-id", pokemon.id);
            releaseButton.innerText = "Release";
            li.appendChild(releaseButton);
            ul.appendChild(li);
        });
        [p, button, ul].forEach(element => trainerCard.appendChild(element));
        document.querySelector('main').appendChild(trainerCard);
    }));

function addPokemon(trainer_id) {
    formData = {
        trainer_id: trainer_id
    };
}

let formData;
       
let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(formData)
};
       
fetch(POKEMONS_URL, configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        console.log(object);
    })
    .catch(function(error) {
        alert("Bad things! Ragnarők!");
        console.log(error.message);
    });