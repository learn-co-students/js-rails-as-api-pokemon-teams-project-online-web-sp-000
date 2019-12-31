const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let trainersJson = null;
let pokemonJson = null;

function getPokemon(){
  return fetch(POKEMONS_URL)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
    })
    .catch();
}

function getTrainers(){
  return fetch(TRAINERS_URL)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
    })
    .catch();
}
object.onload = function(){
  getPokemon();

};
