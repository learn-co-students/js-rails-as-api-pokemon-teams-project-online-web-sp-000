const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

    async function f() {
        await fetchTrainers();
        fetchPokemon();
    }

    f();
})

function fetchTrainers() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => trainers(json))
}

function trainers(json) {
    const main = document.getElementById('main')
    json['data'].forEach(trainer => {
        const div = document.createElement('div');
        div.className = "card";
        div.setAttribute("data-id", `${trainer['id']}`)
        const p = document.createElement('p')
        p.innerHTML = `${trainer['attributes']["name"]}`;
        const button = document.createElement('button')
        button.innerHTML = "Add Pokemon";
        button.setAttribute("data-trainer-id", `${trainer['id']}`)
        const ul = document.createElement('ul');
        button.addEventListener("click", function() {addPokemon(trainer['id'])});
        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
      })
  }

function fetchPokemon() {
    fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then(json => pokemon(json))
}

function pokemon(json) {

    json['data'].forEach(pokemon => {
        let ul = document.querySelector(`[data-id="${pokemon['attributes']['trainer_id']}"]`).getElementsByTagName("ul")[0];
        let li = document.createElement('li');
        li.innerHTML = `${pokemon['attributes']['nickname']} (${pokemon['attributes']['species']}) `;
        let button = document.createElement('button');
        button.innerHTML = "Release";
        button.className = "release";
        button.setAttribute("data-pokemon-id", `${pokemon['id']}`)
        button.addEventListener("click", function() {deletePokemon(pokemon['id'])});
        li.appendChild(button);
        ul.appendChild(li);
    })
}

function addPokemon(trainer_id) {
    let formData = {
        trainer_id: `${trainer_id}`
        };

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
        .then(function(json) {
        addAPokemon(json);
        })
        .catch(function(error) {
        console.log(error.message);
        });
  }

function addAPokemon(json) {
    if (json['data'] == "Too many pokemon") {}
    else {
        let ul = document.querySelector(`[data-id="${json['data']['attributes']['trainer_id']}"]`).getElementsByTagName("ul")[0];
        let li = document.createElement('li');
        li.innerHTML = `${json['data']['attributes']['nickname']} (${json['data']['attributes']['species']}) `;
        let button = document.createElement('button');
        button.innerHTML = "Release";
        button.className = "release";
        button.setAttribute("data-pokemon-id", `${json['data']['id']}`)
        button.addEventListener("click", function() {deletePokemon(json['data']['id'])});
        li.appendChild(button);
        ul.appendChild(li);
    }
}

  function deletePokemon(pokemon_id) {

    let formData = {
        id: `${pokemon_id}`
        };

        let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
        };

    fetch(`http://localhost:3000/pokemons/${pokemon_id}`, configObj)
        .then(function(response) {
        return response.json();
        })
        .then(function(json) {
        deleteAPokemon(json);
        })
        .catch(function(error) {
        console.log(error.message);
        });
  }

  function deleteAPokemon(json) {
    let button = document.querySelector(`[data-pokemon-id="${json['data']}"]`)
    button.parentElement.remove();
}
