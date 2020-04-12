const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pretendPokemon = {id: 2, nickname:'Bob', species:'Squirtal'}

function makeTrainerCard(trainer{
  let div = document.createElement('div')
  div.className = 'card'
  div['div-id'] = trainer.id
  let p = document.createElement('p')
  p.innerText = trainer.name
  div.appendChild(p)
  let button = document.createElement('button')
  button['data-trainer-id'] = trainer.id
  button.innerText = 'Add Pokemon'
  div.appendChild(button)
  let ul = document.createElement('ul')
  for(const pokemon of trainer.pokemons){
    ul.appendChild(makePokemonLi(pokemon))
  }
  div.appendChild(ud)
  return div
}

function makePokemonLi(pokemon){
  let li = document.createElement('li')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  releaseButton = document.createElement('button')
  releaseButton.className = 'release'
  releaseButton.innerText = 'Release'
  li.appendChild(releaseButton)
  li['data-pokemon-id'] = pokemon.id
  return li
}

document.addEventListener("DOMContentLoaded", () => {
  ul = document.createElement('ul')
  ul.appendChild(makePokemonLi(pretendPokemon))
  document.querySelector('main').appendChild(ul)
})
