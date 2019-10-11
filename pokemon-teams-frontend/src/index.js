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
        button.addEventListener('click', addPokemon);
        let ul = document.createElement('ul');
        trainer.pokemons.forEach(function(pokemon) {
            let li = document.createElement('li');
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            let releaseButton = document.createElement('button');
            releaseButton.className = "release";
            releaseButton.setAttribute("data-pokemon-id", pokemon.id);
            releaseButton.innerText = "Release";
            releaseButton.addEventListener('click', deletePokemon);
            li.appendChild(releaseButton);
            ul.appendChild(li);
        });
        [p, button, ul].forEach(element => trainerCard.appendChild(element));
        document.querySelector('main').appendChild(trainerCard);
    }));

function addPokemon() {
    let trainerId = this.getAttribute('data-trainer-id');
    let button = this;
    
    let formData = {
        trainer_id: trainerId
    }

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
        .then(function(pokemon) {
            let li = document.createElement('li');
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            let releaseButton = document.createElement('button');
            releaseButton.className = "release";
            releaseButton.setAttribute("data-pokemon-id", pokemon.id);
            releaseButton.innerText = "Release";
            releaseButton.addEventListener('click', deletePokemon);
            li.appendChild(releaseButton);
            button.parentNode.querySelector('ul').appendChild(li);
        })
        .catch(function(error) {
            alert("Bad things! Ragnarők!");
            console.log(error.message);
        });
}

function deletePokemon() {
    let pokemonId = this.getAttribute('data-pokemon-id');
    let button = this;
    
    let formData = {
        pokemon_id: pokemonId
    }

    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };
           
    fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            button.parentNode.remove();
        })
        .catch(function(error) {
            alert("Bad things! Ragnarők!");
            console.log(error.message);
        });
}