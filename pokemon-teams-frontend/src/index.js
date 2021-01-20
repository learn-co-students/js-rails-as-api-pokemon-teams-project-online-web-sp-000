const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", function() {
  fetch("http://127.0.0.1:3000/trainers")
  .then(function(response) {
    return response.json()
  }).then(function(json) {

    addCard(json);

  })


  .catch(function(error) {
    main.innerHTML = error.message
  })
});


function addCard(trainer) {

  for (key in trainer){
    let trainId = trainer[key].id

  let card = document.createElement('div')
  card.className = "card"
  card.setAttribute('data-id', trainer[key].id)

  let name = document.createElement('p')
  name.innerText = trainer[key].name
  card.appendChild(name)

  let btn = document.createElement('button')
  btn.setAttribute('data-trainer-id', trainer.id)
  btn.innerText = "Add Pokemon"
  btn.addEventListener('click', (event) => {
    event.preventDefault()
    addPokemon(event)
  })
  card.appendChild(btn)

  let ul = document.createElement('ul')
  card.appendChild(ul)

  fetch("http://127.0.0.1:3000/pokemons/" + `${trainId}`)
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    for (key in json) {
      let pokemon = json[key]

      if (parseInt(pokemon.trainer_id) == parseInt(trainId)) {
    let li = document.createElement('li')
    li.innerHTML = `${pokemon.nickname} ${pokemon.species}`

    let releaseBtn = document.createElement('button')
    releaseBtn.className = "release"
    releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
    releaseBtn.innerText = "Release"
    releaseBtn.addEventListener('click', (event) => {
      event.preventDefault()
      release(event)
    })

    li.append(releaseBtn)
    card.appendChild(li)

      }
    }
  })
  .catch(function(error) {
    main.innerHTML = error.message
  })

  main.appendChild(card)
  }
}











function addPokemon(data){
  let ul = data.target.parentNode.querySelector('ul')

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "trainer_id": data.target.getAttribute('data-trainer-id')
    })
  }

  fetch(POKEMONS_URL, configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    let li = displayPokemon(object)
    ul.appendChild(li)
  })
  .catch(function(error) {
    main.innerHTML = error.message
  })
}
function release(data) {

  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  }

  fetch(POKEMONS_URL+'/'+data.target.getAttribute('data-pokemon-id'), configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    data.target.parentNode.remove()
  })
  .catch(function(error) {
    main.innerHTML = error.message
  })

}
