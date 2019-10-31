const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// sample Farfetch

const addPokemon = trainer_id => {
  requestBody = JSON.stringify( {trainer_id: trainer_id} )
  fetch( POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: requestBody
    } )
    .then( response => {
      return response.json()
    } )
    .then( object => {
      console.log( object.species )
      document.body.innerHTML = object.species
    } )
    .catch( error => {
      document.body.innerHTML = error.message
    } )
}

const releasePokemon = pokemon_id => {
  requestBody = JSON.stringify( {id: pokemon_id} )
  console.log(`${POKEMONS_URL}/${pokemon_id}`)
  
  fetch( `${POKEMONS_URL}/${pokemon_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: requestBody
    } )
    .then( response => {
      return response.json()
    } )
    .then( object => {
      console.log( object.species )
      document.body.innerHTML = object.species
    } )
    .catch( error => {
      document.body.innerHTML = error.message
    } )
}
