// everything works except the add pokemon button doesn't repopulate after a pokemon is removed.  I tried creating an add pokemon function but it wasn't being called for some reason.  Decided not to work on it anymore since it wasn't strictly in the lab requirements for the button to repopulate (i think).
document.addEventListener('DOMContentLoaded', getTrainerData)

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const cardDeck = document.body.getElementsByTagName('main')[0]


function createTrainerCard(trainers){
    for(const trainer of trainers ){
        
        const card = document.createElement('div')
        card.setAttribute('data-id', trainer.id)
        card.setAttribute('class', 'card')
        cardDeck.appendChild(card)

        const trainerName = document.createElement('p')
        trainerName.innerText = trainer.attributes.name
        card.appendChild(trainerName)


        const trainerPokemonList = trainer.relationships.pokemons.data

        if(trainerPokemonList.length < 6){
            const addPokemon = document.createElement('button')
            addPokemon.setAttribute('data-trainer-id', trainer.id)
            addPokemon.innerText = 'Add Pokemon'
            card.appendChild(addPokemon)
            addPokemon.addEventListener('click', generatePokemon)
        }

        const pokeList = document.createElement('ul')
        pokeList.setAttribute('class', 'pokemon-list')
        card.appendChild(pokeList)

        for(const pokemon of trainerPokemonList){
             getPokemonDataById(pokemon.id, createPokemonLi)

        }
    }

}

function addPokeButton(pokemonList){
    if(pokemonList.length < 6){
        const addPokemon = document.createElement('button')
        addPokemon.setAttribute('data-trainer-id', trainer.id)
        addPokemon.innerText = 'Add Pokemon'
        card.appendChild(addPokemon)
        addPokemon.addEventListener('click', generatePokemon)
    }
}



function createPokemonLi(pokemon){
    const trainerID = pokemon.relationships.trainer.data.id
    const trainerCard = document.querySelector('[data-id="'+trainerID+'"]')
    const pokeList = trainerCard.getElementsByClassName('pokemon-list')[0]

    

    const listItem = document.createElement('li')
    listItem.innerText = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`
    pokeList.appendChild(listItem)
    
    const releaseButton = document.createElement('button')
    releaseButton.setAttribute('class', 'release')
    releaseButton.setAttribute('data-pokemon-id', pokemon.id)
    releaseButton.innerText = 'Release'
    listItem.appendChild(releaseButton)
    releaseButton.addEventListener('click', releasePokemon)
    
}

function releasePokemon(event){
  const pokemonLi = event.target.parentNode
  const pokemonId = event.target.dataset.pokemonId
  const pokeList = pokemonLi.parentNode
  console.log(POKEMONS_URL+`/${pokemonId}`)
  return fetch(POKEMONS_URL+`/${pokemonId}`, {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'}
  }).then(
      response => response.json()
    ).then(pokemonLi.remove(), function(){
        const trainerId = pokeList.parentNode.dataset.id
        if(pokeList.length < 6){
                const addPokemon = document.createElement('button')
                addPokemon.setAttribute('data-trainer-id', trainerId)
                addPokemon.innerText = 'Add Pokemon'
                pokeList.parentNode.prepend(addPokemon)
                addPokemon.addEventListener('click', generatePokemon)
            }
        }
    ).catch(error => console.log(`$(error)`))
}

function generatePokemon(event){
    const trainerId = event.target.attributes[0].value

    fetch(POKEMONS_URL, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trainer: trainerId })
        // why does this only have to be trainer? and not the pokemon name/species? -> because we are creating it in the create model in the backend code.

    }).then(response => response.json()).then(pokemon => createPokemonLi(pokemon['data']))
}
function  getTrainerData(){
    return fetch(TRAINERS_URL).then(response => response.json()).then(
        trainers=> createTrainerCard(trainers['data'])
        )
}
function getPokemonDataById(pokemonId, sendingTo){
    return fetch(POKEMONS_URL+`/${pokemonId}`).then(response => response.json()).then(
        pokemonData => sendingTo(pokemonData['data'])
        )
}