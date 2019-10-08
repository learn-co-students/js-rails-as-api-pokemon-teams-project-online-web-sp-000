const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
//
// document.addEventListener("DOMContentLoaded", () => {
//   loadTrainers()
// })
//
// function loadTrainers() {
//   fetch(TRAINERS_URL)
//     .then(resp => resp.json())
//     .then(json => {
//       json.forEach(trainer => {
//         let newTrainer = document.createElement('div')
//         newTrainer.className = "card"
//         newTrainer.dataset.id = trainer.id
//         newTrainer.innerHTML = `
//         <p>${trainer.name}</p>
//         <button class="add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
//         <ul></ul>
//         `
//         document.querySelector('main').appendChild(newTrainer)
//         newTrainer.querySelector('.add-pokemon').addEventListener("click", addPokemon)
//
//         let ul = newTrainer.querySelector('ul')
//         trainer.pokemons.forEach(pokemon => {
//           let li = document.createElement('li')
//           li.innerHTML = `
//             ${pokemon.nickname} (${pokemon.species})
//               <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
//           `
//           ul.appendChild(li)
//         })
//       })
//       addClickListeners()
//     })
// }
//
// function addClickListeners(){
//   document.querySelectorAll('.release').forEach(element => {
//     element.addEventListener("click", releasePokemon)
//   })
// }
//
// function addPokemon(){
//   const body = {
//     "trainer_id": this.dataset.trainerId
//   }
//   fetch(POKEMONS_URL, {
//     method: 'post',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(body)
//   })
//   .then(resp => resp.json())
//   .then(json => {
//     let card = document.querySelector(`.card[data-id="${json.trainer_id}"]`)
//     let li = document.createElement('li')
//     li.innerHTML = `
//       ${json.nickname} (${json.species})
//         <button class="release" data-pokemon-id="${json.id}">Release</button>`
//     card.querySelector('ul').appendChild(li)
//   })
// }
//
// function releasePokemon(){
//   fetch(POKEMONS_URL + `/${this.dataset.pokemonId}`, {
//     method: 'delete'
//   })
//   .then(resp => resp.json())
//   .then(json => {
//     document.querySelector(`.release[data-pokemon-id="${json.id}"]`).parentElement.remove()
//   })
// }
