const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */

document.addEventListener("DOMContentLoaded", () => {
    getTrainers()
})

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        renderTrainersHtml(json)
        addClickListeners()
     })
}

function renderTrainersHtml(data) {
    console.log("in renderTrianersHtml data  = ", data)
    data.forEach(trainer => {
        let newTrainer = document.createElement('div')
        newTrainer.className = "card"
        newTrainer.setAttribute("data-id", trainer.id);
        newTrainer.innerHTML = `<p>${trainer.name}</p>`
        document.querySelector('main').appendChild(newTrainer)

        let addPokemonButton = document.createElement('button')
        addPokemonButton.className = "add-pokemon"
        addPokemonButton.setAttribute("data-trainer-id", trainer.id);
        addPokemonButton.innerHTML = "Add Pokemon"
        newTrainer.append(addPokemonButton)

        let pokemonList = document.createElement('ul')
        console.log("trainer", trainer.name, trainer.pokemons)
          
        pokemonList.innerHTML = ''
        trainer.pokemons.forEach(pokemon => {
             pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release </button>`       
        })

        newTrainer.append(pokemonList)

    })
}

    

function addClickListeners(){
    document.querySelectorAll('.release').forEach(element => {
      element.addEventListener("click", releasePokemon)
    })

    document.querySelectorAll('.add-pokemon').forEach(element => {
        element.addEventListener("click", addPokemon)
    })
}


function addPokemon() {
    // console.log(this.dataset)
    // DOMStringMap {trainerId: "2"}
    // trainerId: "2"
    let trainer_id = parseInt(this.dataset.trainerId)

//     #=> Example Request
// POST /pokemons
 
// Required Headers:
// {
//   'Content-Type': 'application/json'
// }
 
// Required Body:
// {
//   "trainer_id": 1
// }
 
// #=> Example Response
// {
//   "id":147,
//   "nickname":"Gunnar",
//   "species":"Weepinbell",
//   "trainer_id":1
// }

    const body = { "trainer_id": trainer_id }
 
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      .then(resp => resp.json())
      .then(json => {
          let trainerEl = document.querySelector(`button[data-trainer-id="${json.trainer_id}"]`)
          //trainer.parentElement is div for trainer
          let ulEl = trainerEl.parentElement.querySelector('ul')
          ulEl.innerHTML += `<li>${json.nickname} (${json.species}) <button class="release" data-pokemon-id="${json.id}">Release </button>`
      })



}

function releasePokemon(){
     
    //console.log(this.dataset)
    // DOMStringMap {pokemonId: "1"}
    // pokemonId: "1"
     let pokemon_id = parseInt(this.dataset.pokemonId)
    //console.log(pokemon_id)
    fetch(POKEMONS_URL + `/${pokemon_id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(json => {
        let findPokemon = document.querySelector(`button[data-pokemon-id="${json.id}"]`)
        findPokemon.parentElement.remove()
    })
  }


