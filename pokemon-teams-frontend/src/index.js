const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
//This may help
{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> 

Remember that your user stories are:

1.When a user loads the page, 
    they should see all trainers, 
    with their current team of Pokemon.

2.Whenever a user hits "Add Pokemon" and they have space on their team, 
they should get a new Pokemon.

3.Whenever a user hits "Release Pokemon" on a specific Pokemon team, 
that specific Pokemon should be released from the team.

You should build out just enough of your Rails API to achieve the above. 
You should not build out full CRUD on each model. 
For example, the frontend will not have the ability to create
 a new Trainer, so your backend should not have a POST /trainers route.

*/}

//1
document.addEventListener('DOMContentLoaded', () => {
    getTrainers()
})
function getTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
    trainers.forEach(trainer => {
      renderTrainers(trainer)
    })
  })
}
const main =  document.querySelector('main')
function renderTrainers(trainer) {
  let name = document.createElement('p')
  name.innerText = trainer.name

  let btn = document.createElement('button')
  btn.setAttribute('id', `${trainer.id}`)
  btn.innerText = "Add Pokemon"
  btn.addEventListener('click', (event) => {
    addPokemon(event)
  })

  let pokemonUL = document.createElement('ul')
  trainer.pokemons.forEach(pokemon => {
    let pokemonLI = document.createElement('li')
    pokemonLI.innerText = `${pokemon.nickname} (${pokemon.species})`  
    
    let pokeButton = document.createElement('button')
    pokeButton.setAttribute('class', 'release')
    pokeButton.setAttribute('data-id', pokemon.id)
    pokeButton.innerText = "Release"
    pokeButton.addEventListener('click', (event) => {
      dropPokemon(event)
    })
    pokemonLI.append(pokeButton)
    pokemonUL.appendChild(pokemonLI)
  })

  let trainerDiv = document.createElement('div')
  trainerDiv.setAttribute('class', 'card')
  trainerDiv.setAttribute('data-id', trainer.id)
  trainerDiv.append(name, btn, pokemonUL)
  main.appendChild(trainerDiv) 
}

//2.
function addPokemon(event) {
  console.log("hi")  
  let trainerId = event.target.id
  console.log(trainerId)  
  let trainerDiv = event.target.parentElement
  console.log(trainerDiv.dataset.id)
  let team = document.querySelector(`div[data-id="${trainerId}"] ul`)
  console.log(team.children.length < 6)

  if (team.children.length < 6) {
    console.log("there is room"),
    createPokemon(event)
  }

}

function createPokemon(event) {
  console.log("hello from create function")
  let trainer_id = event.target.id
  let team = document.querySelector(`div[data-id="${trainer_id}"] ul`)

  let data = {
    "trainer_id": trainer_id
  }
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
  .then(result => {
    let pokemonLI = document.createElement('li')
    pokemonLI.innerText = `${result.nickname} (${result.species})`  
  
    let pokeButton = document.createElement('button')
    pokeButton.setAttribute('class', 'release')
    pokeButton.setAttribute('data-id', result.id)
    pokeButton.innerText = "Release"
    pokeButton.addEventListener('click', (event) => {
      dropPokemon(event)
    })
    pokemonLI.append(pokeButton)
    team.appendChild(pokemonLI)
  })
}
//3.
function dropPokemon(event) {
  event.preventDefault()
  fetch(POKEMONS_URL+`/${event.target.dataset.id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    }
})
.then(response => console.log(response))
.then(event.target.parentElement.remove())
}

