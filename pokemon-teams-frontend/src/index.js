const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const releasePokemon = event => {
  let pokemon_id = event.target.dataset.pokemonId
  let pokemon = event.target
  requestBody = JSON.stringify( {id: pokemon_id} )

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
      let li = pokemon.parentNode
      li.parentNode.removeChild( li )
    } )
    .catch( error => {
      document.body.innerHTML = error.message
    } )
}

const pokemonListing = pokemon => {
  li = document.createElement( 'li' )
  li.textContent = `${pokemon.nickname} (${pokemon.species})`

  button = document.createElement( 'button' )
  button.setAttribute( 'class', 'release' )
  button.setAttribute( 'data-pokemon-id', pokemon.id )
  button.textContent = 'Release'
  button.addEventListener( 'click', releasePokemon )
  li.appendChild( button )
  return li
}

const addPokemon = event => {
  let trainer_id = event.target.dataset.trainerId
  let ul = event.target.nextSibling
  
  if ( ul.querySelectorAll( 'li' ).length < 6 ) {
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
        let li = pokemonListing( object )
        ul.appendChild( li )
      } )
      .catch( error => {
        document.body.innerHTML = error.message
      } )
  }
}

const trainerCard = trainer => {
  main = document.querySelector( 'main' )

  card = document.createElement( 'div' )
  card.setAttribute( 'class', 'card' )
  card.setAttribute( 'data-id', trainer.id )

  trainerName = document.createElement( 'p' )
  trainerName.innerText = trainer.name
  card.appendChild( trainerName )

  addButton = document.createElement( 'button' )
  addButton.setAttribute( 'data-trainer-id', trainer.id )
  addButton.innerText = 'Add Pokemon'
  addButton.addEventListener( 'click',  addPokemon )
  card.appendChild( addButton )

  let list = document.createElement( 'ul' )

  for( let pokemon of trainer.pokemons ){
    list.appendChild( pokemonListing( pokemon ))
  }

  card.appendChild( list )
  main.appendChild( card )
  return card
}

const buildCards = trainers => {
  for ( let trainer of trainers ){
    trainerCard( trainer )
  }
}

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

document.addEventListener( "DOMContentLoaded", getTrainers() )
