const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
})

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(trainer => {
          addTrainers(trainer)
      })
      })
  }

  function addTrainers(trainer) {
      const main = document.querySelector("main")
      const newDiv = document.createElement('div')   
        newDiv.classList.add("card")
        newDiv.setAttribute('data-id', trainer.id)
      main.append(newDiv)
      const p = document.createElement('p')
      p.innerHTML = trainer.name 
      newDiv.append(p) 
      const newButton = document.createElement('button')
        newButton.setAttribute('data-trainer-id', trainer.id)
        newButton.innerHTML = "Add Pokemon"
      p.appendChild(newButton) 
      newButton.addEventListener("click", event => {
        addPokemon(trainer, event)
      })
      const pokemonUl = document.createElement('ul')
      pokemonUl.id = trainer.id
      p.appendChild(pokemonUl)
      trainer.pokemons.forEach(pokemon => {
          const pokemonLi = document.createElement('li')
          pokemonLi.innerHTML = `${pokemon.nickname} (${pokemon.species})`
          pokemonUl.appendChild(pokemonLi) 
          const releaseButton = document.createElement('button')
            releaseButton.classList.add("release")
            releaseButton.setAttribute("data-pokemon-id", pokemon.id)
            releaseButton.innerHTML = "Release"
            releaseButton.addEventListener("click", event => {
                releasePokemon(pokemon, event)
            })
            //add event listener for button, release function
          pokemonLi.appendChild(releaseButton)
      })
  }

function addPokemon(trainer, event) {
    event.preventDefault()
    const pokemonUl = event.target.parentElement.lastChild
    if(pokemonUl.children.length < 6) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trainer_id" : trainer.id
        })
    })
    .then(resp => resp.json())
    .then(newPokemon => {
            const pokemonLi = document.createElement('li')
            pokemonLi.innerHTML = `${newPokemon.nickname} (${newPokemon.species})`
            pokemonUl.appendChild(pokemonLi) 
            const releaseButton = document.createElement('button')
            releaseButton.classList.add("release")
            releaseButton.setAttribute("data-pokemon-id", newPokemon.id)
            releaseButton.innerHTML = "Release"
            releaseButton.addEventListener("click", event => {
                releasePokemon(pokemon, event)
            })
            pokemonLi.appendChild(releaseButton)
    }) 
    }
}

function releasePokemon(pokemon, event) {
    event.preventDefault()
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        event.target.parentNode.remove()
    })
}