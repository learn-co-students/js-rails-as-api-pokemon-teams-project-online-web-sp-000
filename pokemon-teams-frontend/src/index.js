const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getTrainers() {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(trainers => {
      trainers.forEach(trainer => {
       console.log(trainer);
      })
    });
}

getTrainers();