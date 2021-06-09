const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then( trainers => addTrainersToDom(trainers))  
})

function addTrainersToDom(trainers) {
  trainers.forEach( trainer => {
    let div = document.createElement('div')
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', `${trainer.id}`)
    div.innerHTML = 
      `<p>${trainer.name}<p>
       <button data-trainer-id="${trainer.id}">Add Pokemon</button>
       <ul></ul>`
    document.querySelector('main').appendChild(div)

    let addPokemonButton = div.children[1];
    let list = div.children[2]

    addPokemonButton.addEventListener('click', function(e) {
        if (list.children.length < 6) {
          handleAddPokemon(trainer);
        } else {
          alert("Each team can have a maximum of 6 pokemons")
        }
    })
    
    trainer.pokemons.forEach(pokemon => {
      addPokemonToDom(pokemon, list)
    })
  })
}

function handleAddPokemon(trainer){

  function pokemonConfig(trainer) {
    return {
      method: "POST",
      headers: { 
        'Content-Type' : 'application/json',
        'Accept' : 'application/json' 
      },
      body: JSON.stringify({ 'trainer_id' : trainer.id})
    }
  }
  return fetch(POKEMONS_URL, pokemonConfig(trainer))
    .then( resp =>  resp.json())
    .then( pokemon => addPokemonToDom(pokemon))
    .catch( error => alert(error.message))
}

function addPokemonToDom(pokemon, list) {
  let li = document.createElement('li')
  li.innerHTML = 
    `${pokemon.nickname} (${pokemon.species}) 
     <button class="release" data-pokemon-id= "${pokemon.id}"> Release </button>`

  if (list) {
    list.appendChild(li)
  } else {
    findTrainerList(pokemon).appendChild(li)
  }

  let releaseButton = li.children[0]
  releaseButton.addEventListener('click', function() {
    handleReleasePokemon(pokemon)
  })
}

function findTrainerList(pokemon) {
  let ul = Array.from(document.querySelectorAll('div.card')).find( x => x.getAttribute('data-id') === `${pokemon.trainer_id}`).querySelector('ul')
  return ul
}


function handleReleasePokemon(pokemon) {
  
  function releaseConfig(pokemon) {
    return {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({'pokemon': pokemon.id})
    }
  }
  return fetch(POKEMONS_URL+`/${pokemon.id}`, releaseConfig(pokemon))
    .then(resp => resp.json())
    .then(obj => removeFromDom(obj))
    .catch(error => alert(error.message))
}

function removeFromDom(obj) {
  const buttonsList = Array.from(findTrainerList(obj).querySelectorAll('button'))
  buttonsList.find( button => button.getAttribute('data-pokemon-id') === `${obj.id}`).parentElement.remove()
}
  















