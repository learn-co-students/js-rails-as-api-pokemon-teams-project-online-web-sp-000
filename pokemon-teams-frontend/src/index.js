const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')




fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(putTrainersOnPage)