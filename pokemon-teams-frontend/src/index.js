const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName("main")[0];

//Load Pokemons
document.addEventListener('DOMContentLoaded', () => {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
      json.forEach( element => {
        createDivCard(element);
      })
    })
})

function createDivCard(element) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("data-id", element.id)
  main.appendChild(div);
  createPTagWithName(element, div);
  createAddPokemonButton(element, div);
  createListOfPokemon(element, div);
}

function createPTagWithName(element, div) {
  const pTag = document.createElement("p");
  pTag.innerText = element.name
  div.appendChild(pTag);
}

function createAddPokemonButton(element, div) {
  const button = document.createElement("button");
  button.setAttribute("data-trainer-id", element.id)
  button.innerHTML = "Add Pokemon"
  button.addEventListener("click", addPokemon);
  div.appendChild(button);
}

function createListOfPokemon(element, div) {
  const ul = document.createElement("ul");
  div.appendChild(ul);
  element.pokemons.forEach(poke => {
    createListItem(poke, ul);
  })
}

function createListItem(poke, ul) {
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerHTML = `${poke.nickname} (${poke.species})`
  createReleaseButton(poke, li);
}

function createReleaseButton(poke, li) {
  const button = document.createElement("button");
  button.classList.add("release");
  button.setAttribute("data-pokemon-id", poke.id)
  button.innerHTML = "Release"
  button.addEventListener("click", releasePokemon);
  li.appendChild(button);
}

//addPokemon function
function addPokemon(event) {
  const trainerId = event.target.dataset.trainerId;
  const div = document.querySelector(`[data-id='${trainerId}']`)
  const lis = div.querySelectorAll("li");

  if (lis.length < 6) {

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        trainer_id: trainerId
      })
    }

    fetch(POKEMONS_URL, configObj)
      .then(resp => resp.json())
      .then(json => {
        const ul = div.querySelector('ul')
        createListItem(json, ul);
      })
  } else {
    console.log("do nothing");
  }
}

// Release pokemon function

function releasePokemon(event) {
  const pokemonId = event.target.dataset.pokemonId
  const deleteObj = {
    method: "DELETE",
    headers: {
      // "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: {
      pokemon_id: pokemonId
    }
  }

  fetch(`${POKEMONS_URL}/${pokemonId}`, deleteObj)
    .then(() => {
      const button = document.querySelector(`[data-pokemon-id='${pokemonId}']`)
      const li = button.parentElement;
      li.remove();
    })

}
