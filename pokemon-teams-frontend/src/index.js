const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(function(object) {
        seeTrainers(object);
    })
    .catch(function(error) {
        alert("Server Error");
        console.log(error.message);
    });
}

function addPokemon(trainer) {
    if (trainer.pokemon.length > 5) {
        alert("Teams are limited to 6 pokemon!")
    } else {
        let configObj = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({trainer_id: trainer.id})
        }

        fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(function(object) {
            fetchTrainers();
        })
    }
}

function deletePokemon(pokemon) {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {method: 'delete'})
    .then(resp => resp.json())
    .then(function(object) {
        fetchTrainers();
    })
}


function seeTrainers(trainerObj) {
    const main = document.querySelector("main");
    main.innerHTML = '';
    
    trainerObj.forEach((trainer) => {
        const div = document.createElement("div");
        div.setAttribute("class", "card");
        div.setAttribute("data-id", trainer.id);

        const p = document.createElement("p");
        p.innerText = trainer.name;

        const button = document.createElement("button");
        button.setAttribute("data-trainer-id", trainer.id);
        button.innerText = "Add Pokemon";
        button.addEventListener("click", function() {
            addPokemon(trainer);
        })

        const ul = document.createElement("ul");

        trainer.pokemon.forEach((pokemon) => {
            const li = document.createElement("li");
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;

            const releaseBtn = document.createElement("button");
            releaseBtn.setAttribute("class", "release");
            releaseBtn.setAttribute("data-pokemon-id", pokemon.id);
            releaseBtn.innerText = "Release";
            releaseBtn.addEventListener("click", function() {
                deletePokemon(pokemon);
            })

            ul.append(li);
            li.append(releaseBtn);
        })
        main.appendChild(div);
        div.append(p, button, ul);
    })
}


document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers();
});