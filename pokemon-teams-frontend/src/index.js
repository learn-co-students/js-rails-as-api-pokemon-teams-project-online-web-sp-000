const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const getTrainers = () => {
    fetch( TRAINERS_URL )
      .then( response => response.json() )
      .then( trainers => {
        buildCards( trainers )
      })
      .catch( error => {
        document.body.innerHTML = error.message
      } )
  }