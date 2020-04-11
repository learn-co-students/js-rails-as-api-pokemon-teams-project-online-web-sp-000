const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function makeTrainerCard(){

}

function makePokemonLi(pokemon){
  let li = document.createElement('li')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  releaseButton = document.createElement('button')
  releaseButton.className = 'release'
  release.innerText = 'Release'
  li['data-pokemon-id'] = pokemon.id
}
