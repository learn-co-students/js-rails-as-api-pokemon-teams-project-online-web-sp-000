const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
    fetch (TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => displayTrainers(json))
  }
  
  function fetchPokemon(url, div){
    fetch(url)
    .then(resp => resp.json())
    .then(json => displayPokemon(json, div))
  }
  
 