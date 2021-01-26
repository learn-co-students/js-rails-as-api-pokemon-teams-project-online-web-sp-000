const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  fetchTrainers();
})

// When a user loads the page, they should see all trainers, with their current team of Pokemon.

const fetchTrainers = () => {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainers => {
    trainers.forEach(trainer => renderTrainers(trainer))
  })
}

const renderTrainers = (trainer) => {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const button = document.createElement('button')
  const ul = document.createElement('ul')

  div.setAttribute('class', 'card')
  div.setAttribute('data-id', trainer.id)
  p.innerHTML = trainer.name
  button.setAttribute('data-id', trainer.id)
  button.innerHTML = 'Add Pokemon'
  button.addEventListener('click', addPokemon) 

  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(ul)
  document.querySelector('#trainerContainer').appendChild(div)

  trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) => {
  const ul = document.querySelector(`div[data-id='${pokemon.trainer_id}']`)
  // 
  const li = document.createElement('li')
  const button = document.createElement('button')

  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
  button.setAttribute('class', 'release')
  button.setAttribute('data-pokemon-id', pokemon.id)
  button.innerHTML = 'Release'
  button.addEventListener('click', releasePokemon) 

  li.appendChild(button)
  ul.appendChild(li)
}

const addPokemon = (event) => {
  event.preventDefault()
   const configObject = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: event.target.dataset.trainerId
    }) 
  }
  fetch(POKEMONS_URL, configObject)
  .then(response => response.json())
  .then(json => {
    if (json.message){
      alart(json.message)
    } else {
      renderPokemon(json)
    } 
  })
}

const releasePokemon = (event) => {
  event.preventDefault
  const configObject = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObject)
  event.target.parentElement.remove()
}


  // const renderTrainers = (trainers) => {
  //   let trainerInfo = trainers.forEach((trainer) => {
  //       return `
  //       <div class="card" data-id="${trainer.id}">
  //       <p>${trainer.name}</p>
  //       <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  //       </div>
  //       `
  //     renderPokemons(trainer.pokemons, pokemonUL)
  //   })
  //   document.querySelector('#trainerContainer').innerHTML = trainerInfo.join('') // join converts the array into a string, innerHTML needs a string as an argument not array 
    
  // }

  // const renderPokemons = (pokemon, ) => {
  //   // grab the div for the data id is equal to the pokemon trainer id, the right pokemon to the right trainer
  //   // create list item for all of the pokemon 
  //   // const associatedTrainerUL = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`) 

  //   return `
  //   div[data-id="${pokemon.trainer_id}"]
  //   <ul>
  //   <li>${pokemon.nickname} (${pokemon.species})
  //   <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
  //   </li>
  //   </ul>
  //   `
  // }




// Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.

//   document.querySelector('data-trainer-id').addEventListener('click'), (event) => {

// }

  // function() {
  //   console.log('hello world')
  // } 

  // () => {
  //   console.log('hello world')
  // }