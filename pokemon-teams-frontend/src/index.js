const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function loadTrainers() {
  fetch(TRAINERS_URL)
    .then((response) => response.json())
    .then((trainerObj) => {
      trainerObj.forEach((trainer) => addTrainer(trainer));
    });
}

function addTrainer(trainer) {
  const mainContainer = document.querySelector("main");

  const newTrainerCard = document.createElement("div");
  newTrainerCard.className = "card";
  newTrainerCard.dataset.id = trainer.id;

  const trainerName = document.createElement("p");
  trainerName.innerText = trainer.name;

  const pokemonList = document.createElement("ul");
  trainer.pokemons.forEach((pokemon) => {
    addPokemon(pokemon, pokemonList);
  });

  const addPokemonButton = document.createElement("button");
  addPokemonButton.dataset.trainerId = trainer.id;
  addPokemonButton.innerText = "Add Pokemon";
  addPokemonButton.addEventListener("click", (e) => {
    if (pokemonList.children.length < 6) {
      fetchNewPokemon(trainer.id);
    } else {
      window.alert("Team is full! Release a Pokemon first.");
    }
  });

  newTrainerCard.append(trainerName, addPokemonButton, pokemonList);
  mainContainer.appendChild(newTrainerCard);
}

function addPokemon(pokemon, list) {
  const pokemonLi = document.createElement("li");
  const releaseBtn = document.createElement("button");

  pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`;

  releaseBtn.dataset.pokemonId = pokemon.id;
  releaseBtn.className = "release";
  releaseBtn.innerText = "Release";
  releaseBtn.addEventListener("click", () => {
    removePokemon(pokemon.id);
  });

  pokemonLi.appendChild(releaseBtn);
  list.appendChild(pokemonLi);
}

function fetchNewPokemon(trainerId) {
  const configData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      trainer_id: trainerId,
    }),
  };
  fetch(POKEMONS_URL, configData)
    .then((response) => response.json())
    .then((responseObj) => {
      console.log(responseObj);
      const pokemonList = document.querySelector(
        `div[data-id="${responseObj.trainer_id}"] ul`
      );
      addPokemon(responseObj, pokemonList);
    });
}

function removePokemon(pokemonId) {
  const configData = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  fetch(`${POKEMONS_URL}/${pokemonId}`, configData)
    .then((response) => response.json())
    .then((responseObj) => {
      document
        .querySelector(`button[data-pokemon-id="${responseObj.id}"]`)
        .parentElement.remove();
    });
}

loadTrainers();
