const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => makeCards(json))

function makeCards(json) {
  for (trnr of json) {
    const card = document.createElement('div')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    const ul = document.createElement('ul')

    card.className = 'card'
    card.setAttribute('data-id', trnr.id)
    p.textContent = trnr.name
    btn.setAttribute('data-trainer-id', trnr.id)
    btn.textContent = 'Add Pokemon'
    btn.addEventListener('click', e => addPoke(ul, e))

    trnr.pokemons.forEach(poke => makeLi(ul, poke))

    card.append(p, btn, ul)
    main.appendChild(card)
  }
}

function makeLi(ul, poke) {
  const btn = document.createElement('button')
  const li = document.createElement('li')

  btn.className = 'release'
  btn.setAttribute('data-pokemon-id', poke.id)
  btn.textContent = 'Release'
  btn.addEventListener('click', e => delPoke(e))
  li.textContent = `${poke.nickname} (${poke.species}) `
  li.appendChild(btn)
  ul.appendChild(li)
}

function addPoke(ul, e) {
  e.preventDefault()
  const id = e.target.dataset.trainerId
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ 'trainer_id': id })
  }
  fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(json => {
      if (json.message) {
        alert(json.message)
      } else {
        makeLi(ul, json)
      }
    })
}

function delPoke(e) {
  e.preventDefault()
  const id = e.target.dataset.pokemonId
  const configObj = { method: "DELETE" }
  fetch(`${POKEMONS_URL}/${id}`, configObj)
  e.target.parentElement.remove()
}
