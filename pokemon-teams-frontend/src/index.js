const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {

})

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
function fetchTrainersAndPokemons() {
  fetch("http://localhost:3000/trainers")
    .then(resp => resp.json())
    .then(json => addTrainerCards(json))
}

function addTrainerCards(json) {
  const trainers = document.getElementById('data-id');
  // left off here - just trying to create cards for each trainer and add their names from above fetch
  json.message.forEach(image => {
    let newImg = document.createElement('img');
    newImg.src = image;
    imageDiv.appendChild(newImg);
  })
}
