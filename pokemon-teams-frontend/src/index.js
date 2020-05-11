const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => {
    trainers.data.forEach(trainer => {
      createTrainer(trainer)
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  getTrainers()
})

function createTrainer(trainer) {
  let trainer_data = trainer.attributes

  let div = document.createElement('div')
  div.setAttribute('class', 'card')
  div.setAttribute('id', trainer_data.id)

  let p = document.createElement('p')
  p.innerText = trainer_data.name

  let ul = document.createElement('ul')

  let addButton = document.createElement('button')
  addButton.setAttribute('trainer-id', trainer_data.id)
  addButton.innerText = "Add Pokemon"
  addButton.addEventListener("click", () => {
    if (ul.children.length < 6) {
      createPokemon(trainer_data.id)
    }
  })

  trainer_data.pokemons.forEach(pokemon => {
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    
    let releaseButton = document.createElement('button')
    releaseButton.setAttribute("class", "release")
    releaseButton.innerText = "release"
    releaseButton.addEventListener("click", () => {
      ul.removeChild(li)
      deletePokemon(pokemon.id)
    })
    
    li.appendChild(releaseButton)
    ul.appendChild(li)
  })
  
  div.appendChild(p)
  div.appendChild(addButton)
  div.appendChild(ul)
  document.querySelector('main').appendChild(div)

}

function deletePokemon(id) {
  fetch(POKEMONS_URL + "/" + id, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => {
    if (res.ok) {
        return Promise.resolve('Pokemon deleted.');
    } else {
        console.log(res)
        return Promise.reject('An error occurred.');
    }
  })
  .then(res => console.log(res));
  
}

function createPokemon(id) {
  return fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "trainer_id": id
    })
  })
  .then(res => res.json())
  .then(pokemon => {
    let data = pokemon.data
    let trainer = pokemon.data.relationships.trainer
    addPokemon(data.id)
  })
}

function addPokemon(id) {
  return fetch(POKEMONS_URL + "/" + id)
  .then (res => res.json())
  .then (pokemon => {
    let data = pokemon.data.attributes
    let ul = document.getElementById(data.trainer_id).children[2]
    let li = document.createElement('li')
    li.innerText = `${data.nickname} (${data.species})`
    
    let releaseButton = document.createElement('button')
    releaseButton.setAttribute("class", "release")
    releaseButton.innerText = "release"
    releaseButton.addEventListener("click", () => {
      ul.removeChild(li)
      deletePokemon(data.id)
    })
  
    li.appendChild(releaseButton)
    ul.appendChild(li)
  })
}