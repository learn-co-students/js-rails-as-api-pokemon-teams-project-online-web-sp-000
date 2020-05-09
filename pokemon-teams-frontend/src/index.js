const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetch(TRAINERS_URL)
      .then(resp => resp.json())
      .then(trainers => { trainers.forEach(trainer => {
                      let newEl = document.createElement('div')
                      newEl.setAttribute('class', 'card')
                      let trainerName = document.createElement('p')
                      trainerName.innerHTML = trainer.name
                      trainerName.setAttribute('id', trainer.id)
                      let addButton = document.createElement('button')
                      addButton.innerHTML = 'Add Pokemon'
                      addButton.setAttribute('id', trainer.id)
                      addButton.addEventListener('click', (e) => {
                          e.preventDefault()
                          if (trainer.pokemons.length < 6) {
                            newPokemon(e)
                          }
                      })
                      let ul = document.createElement('ul')
                      trainer.pokemons.forEach(pokemon => {
                          let li = document.createElement('li')
                          li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
                          let removeButton = document.createElement('button')
                          removeButton.innerHTML = 'Release'
                          removeButton.setAttribute('id', pokemon.id)
                          removeButton.addEventListener('click', (e) => {
                              e.preventDefault()
                              removePokemon(e)
                          })
                          li.append(removeButton)
                          ul.append(li)
                      })
                      newEl.append(trainerName, addButton, ul)
                      document.querySelector("main").append(newEl)
                  })
  }).catch(function(error) {
    console.log(error.message)
  })})

  function removePokemon (pokemonData) {
    let configObj = {
        method: "Delete",
      };
    fetch(`${POKEMONS_URL}/${pokemonData.target.id}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      document.body.innerHTML = error.message
    });
  }

  function newPokemon (pokemonData) {
    let formData = {
      "trainer_id": pokemonData.target.id
      };
  
    let configObj = {
        method: "Post",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
  
    fetch(POKEMONS_URL, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(pokemon) {
                      let li = document.createElement('li')
                      li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
                      let removeButton = document.createElement('button')
                      removeButton.innerHTML = 'Release'
                      removeButton.setAttribute('data-pokemon-id', pokemon.id)
                      li.append(removeButton)
                      document.querySelector(`${pokemon.trainer.id} ul`)
    })
    .catch(function(error) {
      document.body.innerHTML = error.message
    });
  }