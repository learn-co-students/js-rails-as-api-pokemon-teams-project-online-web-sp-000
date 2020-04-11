const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pretendPokemon = {id: 2, nickname:'Bob', species:'Squirtal'}
function makeTrainerCard(){

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
