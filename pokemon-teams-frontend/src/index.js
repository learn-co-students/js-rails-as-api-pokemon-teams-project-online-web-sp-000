const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers() {
    fetch(TRAINERS_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function(json) {
            json.forEach(trainer => {
                createTrainerCard(trainer)
            })
        });
}

function createTrainerCard(trainer) {
    const cardContainer = document.querySelector("main")
    let div = document.createElement('div')
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', trainer.id)

    let p = document.createElement('p')
    p.innerText = trainer.name
    let button = document.createElement('button')
    button.setAttribute('data-trainer-id', trainer.id)
    button.setAttribute('class', 'add')
    button.innerText = 'Add Pokemon'
    button.addEventListener("click", event => {
        event.preventDefault();
        addPokemon(event.target.getAttribute('data-trainer-id'))
        console.log(event.target.getAttribute('data-trainer-id'))
    })

    div.append(p, button)
    cardContainer.append(div)

    let ul = document.createElement('ul')
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerText = `${pokemon.nickname} (${pokemon.species})`

        ul.appendChild(li)
        div.appendChild(ul)
        buildReleaseButton(pokemon.id, li)
    })
};

function addPokemon(trainer_id) {
    fetch("http://localhost:3000/pokemons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": trainer_id
        })
    })
        .then(response => {
            return response.json();
        })
        .then(newPokemon => {
            if (newPokemon.nickname === undefined) {
                alert(newPokemon.message);
            } else {
                let li = document.createElement("li");
                let trainerCard = document.querySelector('div[data-id="' + `${trainer_id}` + '"]')
                let ul = trainerCard.lastChild
                li.innerHTML = `${newPokemon.nickname} (${newPokemon.species})`
                ul.appendChild(li);

                buildReleaseButton(newPokemon.id, li)
            }
        })
}

function buildReleaseButton(pokemon_id, li) {
    let button = document.createElement('button')
    button.setAttribute('class', 'release')
    button.setAttribute('data-pokemon-id', pokemon_id)
    button.innerText = 'Release'
    li.appendChild(button)

    button.addEventListener("click", event => {
        event.preventDefault();

        fetch(`http://localhost:3000/pokemons/${pokemon_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "pokemon_id": pokemon_id
            })
        })
            .then(response => {
                return response.json();
            })
            .then(deletedPokemonObj => {
                let listElement = event.target.parentElement;
                listElement.remove();
            })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getTrainers()
});





