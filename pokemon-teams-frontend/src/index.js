//given variables, defining urls
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//initial fetch request, utilizing json in its own function, at bottom
//passing info into list out all the trainers on a card, at bottom
fetch(TRAINERS_URL)
  .then(parseJSON)
  .then(listTrainerCards)

//build the look of each trainer card with the necessary info, based on index.html classes and ids
  function buildTrainerCard(trainer) {
    let div = document.createElement('div')
    div.className = "card"
    div.dataset.id = trainer.id
  
    displayTrainerName(div, trainer.name)
    addPokemonButton(div, trainer.id)
    listTrainersPokemons(div, trainer.pokemons)
  
    const main = document.querySelector('main')
    main.appendChild(div)
  }

  //function to get and display trainer name
  function displayTrainerName(div, name) {
    let p = document.createElement('p')
    p.textContent = name
    div.appendChild(p)
  }

  function listTrainersPokemons(div, pokemons) {
    let ul = document.createElement('ul')
    for(let pokemon of pokemons) {
      let li = renderListItemPokemon(pokemon)
      ul.appendChild(li)
    }
  
    releasePokemon(ul)
    div.appendChild(ul)
  }
  
  function releasePokemon(ul) {
    ul.addEventListener('click', event => {
      if(event.target.tagName == 'BUTTON') {
        event.target.parentNode.remove()
  
        fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    })
  }

  //create button to add to pokemons
  function addPokemonButton(div, trainerId) {
    let button = document.createElement('button')
    button.dataset.trainerId = trainerId
    button.textContent = "Add Pokemon"
    button.addEventListener('click', event => {
  
    let allTrainerPokemon = document.querySelectorAll(`[data-id="${trainerId}"] ul li`)
  
    if (allTrainerPokemon.length < 6) {
      createPokemon(trainerId)
      }
    })
    div.appendChild(button)
  }

  //create the actual pokemon and add to api, add to page
  function createPokemon(trainerId) {
    let obj = {
      "trainer_id": trainerId
    }
  
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(parseJSON)
    .then(pokemon => {
  
      let ul = document.querySelector(`[data-id="${trainerId}"] ul`)
      let li = renderListItemPokemon(pokemon)
      ul.appendChild(li)
    })
  }

  //list pokemon with release button
  function renderListItemPokemon(pokemon) {
    let li = document.createElement('li')
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
  
    let button = document.createElement('button')
    button.className = "release"
    button.textContent = "Release"
    button.dataset.pokemonId = pokemon.id
  
    li.appendChild(button)
    return li
  }



//function to display each trainer card available in dataset by calling function that builds the look of the card
  function listTrainerCards(trainers) {
    trainers.forEach(buildTrainerCard)
  }

//json function:
function parseJSON(response) {
    return response.json()
  }