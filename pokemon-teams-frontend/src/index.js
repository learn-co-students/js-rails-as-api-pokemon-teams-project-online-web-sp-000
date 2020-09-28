const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


/* FETCH */

async function fetchData() {
    let response = await fetch(TRAINERS_URL)
    let trainers = await response.json();
    return await trainers.forEach(trainer => {
      createTrainerCard(trainer);
    })
  }
  
  /* RENDER TRAINER CARDS */
  
  function createTrainerCard(trainer) {
    const container = document.getElementById("container");
    const trainerCard = document.createElement("div");
    trainerCard.setAttribute("class", "card");
    trainerCard.setAttribute("data-trainer-id", `${trainer.id}`);
    const trainerName = document.createElement("p");
    trainerName.innerText = `${trainer.name}`;
    const addButton = document.createElement("button");
    addButton.setAttribute("class", "add");
    addButton.setAttribute("data-trainer-id", `${trainer.id}`);
    addButton.innerText = "Add Pokemon";
    const pokemonRoster = document.createElement("ul");
    pokemonRoster.setAttribute("data-trainer-id", `${trainer.id}`);
    trainerCard.appendChild(trainerName);
    trainerCard.appendChild(addButton);
    trainerCard.appendChild(pokemonRoster);
    container.appendChild(trainerCard);
    createPokemonTeam(trainer, pokemonRoster);
    return container;
  }
    
    
  /* CREATE POKEMON TEAMS */
  
  function createPokemonTeam(trainer, pokemonRoster) {
    for (let pokemon of trainer.pokemons) {
      addPokemonToTeam(pokemon, pokemonRoster);
    }
  }
  
  /* ADD POKEMON TO TEAM */
  
  function addPokemonToTeam(pokemon, pokemonRoster) {
    const poke = document.createElement("li");
    poke.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    const releaseButton = document.createElement("button");
    releaseButton.setAttribute("class", "release");
    releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`);
    releaseButton.innerText = "Release";
    poke.appendChild(releaseButton);
    pokemonRoster.appendChild(poke);
  }
  
  let postFetch = function(trainerId) {
    let obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"trainer_id": trainerId})
    };
    return fetch(POKEMONS_URL, obj)
    .then(resp => resp.json())
    .then(function(pokemon) {
      if (pokemon.errors) {
        window.alert(pokemon.errors[0])
      } else {
        let pokemonRoster = document.body.querySelector(`[data-trainer-id='${pokemon.trainer_id}']`).querySelector("ul");
        addPokemonToTeam(pokemon, pokemonRoster);
      }
    })
  }
  
  /* REMOVE POKEMON FROM TEAM */
  
  let removePokemon = function(pokemonId) {
    let deletePokemon = document.querySelector(`[data-pokemon-id='${pokemonId}']`).parentNode;
    deletePokemon.remove();
  }
  
  let deleteFetch = function(pokemonId) {
    let obj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"pokemon_id": pokemonId})
    };
    fetch(`${BASE_URL}/pokemons/${pokemonId}`, obj)
    removePokemon(pokemonId);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    
    fetchData()
      .then(obj => setButtons())
    function setButtons() {
      let addButtons = document.querySelectorAll("button.add");
      addButtons.forEach(addButton =>
        addButton.addEventListener("click", function(){
          postFetch(event.target.dataset.trainerId);
        })
      )
      let releaseButtons = document.querySelectorAll("button.release");
      releaseButtons.forEach(releaseButton =>
        releaseButton.addEventListener("click", function(){
          deleteFetch(event.target.dataset.pokemonId);
        })
      )
    }
  })