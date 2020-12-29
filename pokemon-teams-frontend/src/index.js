const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function loadTrainers() {
    fetch(TRAINERS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
    })
    .catch(function(error) {
        console.log(error);
    })
}
function eventListeners() {
    document.addEventListener("DOMContentLoaded", function() {
        loadTrainers();
    });
}

function init() {
    eventListeners();
}

init();