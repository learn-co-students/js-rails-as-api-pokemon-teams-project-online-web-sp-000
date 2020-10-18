const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    getTeams()
});

function getTeams() {
    fetchData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
    }
    fetch(TRAINERS_URL)
    .then(function(response) {
    return response.json();
    }).then(function(json) {
    console.log(json);
    });

}

// let main = document.querySelector('main')
// let createDiv = document.createElement('div')
// main.id = 'main'
// let appendedDiv = document.getElementById("main").appendChild(createDiv);
// appendedDiv.classList.add("card")
// appendedDiv.setAttribute("data-id", 1)
// let p = document.createElement('p')
// p.innerHTML = "Prince"
// let addPokemon = document.createElement('button')
// addPokemon.innerHTML = "Add Pokemon"
// addPokemon.setAttribute("data-trainer-id", 1)
// let ul = document.createElement('ul')
// let li = document.createElement('li')
// li.innerHTML = "Jacey (Kakuna)"
// let release = document.createElement('button')
// release.classList.add("release")
// release.setAttribute('data-pokemon-id', 1)
// release.innerHTML = "Release"
// li.appendChild(release)
// ul.appendChild(li)

// appendedDiv.appendChild(p)
// appendedDiv.appendChild(addPokemon)
// appendedDiv.appendChild(ul)

