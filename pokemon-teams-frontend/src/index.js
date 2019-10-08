const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainEl = document.querySelector("main")

document.addEventListener("DOMContentLoaded", function() {
  // Add functions here
  getTrainers();
});

function getTrainers(){
  fetch("http://localhost:3000/trainers")
    .then(resp => resp.json())
    .then(json => {
      for (let i = 0; i < json.length; i++){
        displayTrainer(json[i]);
      }
    });
}

function displayTrainer(trainer){
  const divEl = document.createElement("div"); //create div element
  divEl.className = "card";
  divEl.setAttribute("data-id", trainer.id);

  const nameEl = document.createElement("p"); //create name element
  nameEl.innerHTML = trainer.name;
  divEl.appendChild(nameEl);

  const buttonEl = document.createElement("button"); //create button element
  buttonEl.setAttribute("data-trainer-id", trainer.id);
  buttonEl.innerHTML = "Add Pokemon";
  buttonEl.addEventListener("click", function(e){
    addPokemon(trainer);
  });
  divEl.appendChild(buttonEl);

  //create list of the Trainer's pokemon
  const pokemonList = document.createElement("ul")
  for (let i = 0; i < trainer.pokemons.length; i++){
    const pokemonEl = document.createElement("li");
    pokemonEl.innerHTML = `${trainer.pokemons[i].nickname} (${trainer.pokemons[i].species})`;

    const releaseButton = document.createElement("button");
    releaseButton.innerHTML = "Release";
    releaseButton.className = "release";
    releaseButton.setAttribute("data-pokemon-id", trainer.pokemons[i].id);
    releaseButton.addEventListener("click", function(e){
      deletePokemon(trainer.pokemons[i]);
    });
    pokemonEl.appendChild(releaseButton);

    pokemonList.appendChild(pokemonEl);
  }
  divEl.appendChild(pokemonList);

  mainEl.appendChild(divEl);

  function addPokemon(trainer){
    if (trainer.pokemons.length < 6){
      let pokemon = {
        "trainer_id": trainer.id
      };
  
      let configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pokemon)
      };
  
      fetch('http://localhost:3000/pokemons', configObject)
        .then(resp => resp.json())
        .then(json => {
          const pokemonEl = document.createElement("li");
          pokemonEl.innerHTML = `${json.nickname} (${json.species})`;

          const releaseButton = document.createElement("button");
          releaseButton.innerHTML = "Release";
          releaseButton.className = "release";
          releaseButton.setAttribute("data-pokemon-id", json.id);
          pokemonEl.appendChild(releaseButton);

          pokemonList.appendChild(pokemonEl);
        });
    } else {
      console.log("Pokemon party is full.");
    }
  }
}

function deletePokemon(pokemon){
  let pokemonBody = {
    "pokemon_id": pokemon.id
  };

  let configObject = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pokemonBody)
  };

  fetch("http://localhost:3000/pokemons",configObject)
    .then(resp => resp.json())
    .then(json => {
      let pokeEl = document.querySelector(`[data-pokemon-id="${json.id}"]`);
      pokeEl.parentElement.remove();
    });
}