const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`

// created a function to generate a trainer's pokemons - related: used nested routes in backend
function trainer_pokemons_path(trainerId) {
  return `${TRAINERS_URL}/${trainerId}/pokemons`
}

function trainer_pokemon_path(trainerId, pokemonId) {
  return `${TRAINERS_URL}/${trainerId}/pokemons/${pokemonId}`
}

document.addEventListener("DOMContentLoaded", () => {
  const mainDiv = document.getElementsByTagName('main').item(0)

  fetch(TRAINERS_URL)
    .then((resp) => {return resp.json()})
    .then((json) => {
      for (item of json) {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `<div class="class" data-id="${item.id}"><p>${item.name}</p>
            <button trainer-id="${item.id}">Add Pokemon</button>
            <ul id="trainer-${item.id}">
            </ul>
            </div>`
        mainDiv.appendChild(cardDiv)

        const trainerPokemon_URL = trainer_pokemons_path(`${item.id}`)
        fetch(trainerPokemon_URL)
          .then((resp) => {return resp.json()})
          .then((json) => {
            for (element of json) {
              displayNewPokemon(element.id, element.nickname, element.species, element.trainer_id)
            }
          })
        }

      const addPokemonButton = document.getElementsByTagName('button')
      for (let i = 0; i < addPokemonButton.length; i++ ) {
        addPokemonButton.item(i).addEventListener("click", event => {
          addAPokemon(event.srcElement.attributes.item(0).value)
      })
    };
  });

  function addAPokemon(trainerId) {
    let formData = {
      trainer_id: trainerId
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(trainer_pokemons_path(trainerId), configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      object.id ? displayNewPokemon(object.id, object.nickname, object.species, object.trainer_id) : console.log("nope! none for gretchen wieners.")
    })
  };

  function displayNewPokemon(id, nickname, species, trainer_id) {
    const pokemonList = document.getElementById(`trainer-${trainer_id}`)
    const pokemonListItem = document.createElement('li')
    pokemonListItem.innerHTML = `${nickname} (${species})
      <button pokemon_id="${id}">Remove</button>`
    pokemonList.appendChild(pokemonListItem)
    const removePokemonButton = pokemonListItem.getElementsByTagName('button')
    removePokemonButton.item(removePokemonButton.length - 1).addEventListener("click", event => {
        removeAPokemon(trainer_id, id, event)
    })
  }

  function removeAPokemon(trainerId, pokemonId, event) {
    let formData = {
      pokemon_id: pokemonId
    }

    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(trainer_pokemon_path(trainerId, pokemonId), configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      const removeListItem = event.srcElement.parentNode
      removeListItem.remove()
    })
  }
});
