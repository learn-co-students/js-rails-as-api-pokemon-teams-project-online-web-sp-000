const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
  loadTrainers()
})

function loadTrainers () {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(data => console.log(data))
}

function renderTrainers(trainer){
  const p = document.createElement('p');
  p.innerText = trainer.name

  const addBtn = document.createElement('button')
  addBtn.setAttribute('data-trainer-id', `${trainer.id}`)

  renderPokemon(trainer)

  const div = document.createElement('div');
  div.setAttribute('class', 'card')
  div.setAttribute('data-id', `${trainer.id}`)
  div.append(p, btn, ul)
}

function renderPokemon(trainer){
  for (const element of trainer.pokemons){
    const releaseBtn = document.createElement('button');
    releaseBtn.setAttribute('class', 'release');
    releaseBtn.setAttribute('data-pokemon-id', `${element.id}`);
    releaseBtn.innerText = "Release";

    let li = document.createElement('li');
    li.innerText = `${element.name} (${element.nickname}) ${releaseBtn}`
  }
}
