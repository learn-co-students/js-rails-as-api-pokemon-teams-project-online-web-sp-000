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
  .then(data => {
    data.forEach(trainerHash => renderTrainer(trainerHash))
  })
}

function renderTrainer(trainer) {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  const ul = document.createElement('ul')

  div.setAttribute('class', 'card')
  div.setAttribute('data-id', trainer.id)
  btn.setAttribute('data-trainer-id', trainer.id)

  p.innerText = trainer.name
  btn.innerText = "Add Pokemon"
  btn.addEventListener("click", addPokemon)

  div.append(p, btn, ul)
  main.append(div)

  trainer.pokemons.forEach(pokemonHash => renderPokemon(pokemonHash))
}

function renderPokemon(pokemon){
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    let li = document.createElement('li');
    const btn = document.createElement('button');

    btn.setAttribute('class', 'release');
    btn.setAttribute('data-pokemon-id', pokemon.id);
    btn.innerText = "Release";
    btn.addEventListener("click", releasePokemon)

    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    li.append(btn)
    ul.append(li)
}

function addPokemon() {

}

function releasePokemon() {

}
