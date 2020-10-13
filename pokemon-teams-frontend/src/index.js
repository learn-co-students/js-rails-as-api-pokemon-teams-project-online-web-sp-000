const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function displayTrainer(trainer) {
  newCard = createCard(trainer);
  displayCard(newCard);
}

function createCard(trainer) {
  newCard = document.createElement("div");
  newCard.className = "card";
  newCard.setAttribute("data-id", trainer.dataIndex);

  nameElement = document.createElement("p");
  nameElement.innerText = trainer.name;
  newCard.appendChild(nameElement);

  newPokemonButton = document.createElement("button");
  newPokemonButton.setAttribute("data-trainer-id", trainer.id);
  newPokemonButton.innerText = "Add Pokemon";
  newCard.appendChild(newPokemonButton);

  newPokemonList = document.createElement("ul");
  newCard.appendChild(newPokemonList);
  for (pokemon of trainer.pokemons) {
    addPokemonToCard(pokemon, newCard);
  }

  return newCard;
}

function addPokemonToCard(pokemon, card) {
  newPokemon = document.createElement("li");
  newPokemon.innerText = `${pokemon.nickname} (${pokemon.species})`;

  releaseButton = document.createElement("button");
  releaseButton.className = "release";
  releaseButton.setAttribute("data-pokemon-id", pokemon.id);
  releaseButton.innerText = "Release";
  newPokemon.appendChild(releaseButton);

  card.querySelector("ul").appendChild(newPokemon);
}

function displayCard(card) {
  document.querySelector("main").appendChild(card);
}

function addPokemon(trainerId) {
  // Action for Add Pokemon Button Clicked: send a "POST" request with the format "POST /pokemons"
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "trainer_id": `${trainerId}`
    })
  };
  fetch(POKEMONS_URL, configObject)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      newPokemon = json;
      trainerCard = document.querySelector(`*[data-trainer-id='${trainerId}']`).parentElement;
      if (newPokemon) {
        addPokemonToCard(newPokemon, trainerCard);
      }
    })
}

function removePokemon(pokemonId) {
  fetch(`${POKEMONS_URL}/${pokemonId}`, { method: 'DELETE' })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      removedPokemon = json;
      document.querySelector(`*[data-pokemon-id='${removedPokemon.id}']`).parentElement.remove();
    })
}

fetch(TRAINERS_URL)
  .then(function(response) {
  	return response.json();
  })
  .then(function(json) {
    let i = 1;
  	for(trainer of json) {
      trainer.dataIndex = i;
      displayTrainer(trainer);
      i++;
    }
  })

document.addEventListener("click", function(e) {
  if (e.target.tagName == "BUTTON") {
    buttonClicked = e.target;
    if (buttonClicked.innerText == "Release") {
      // Action for Release Button Clicked: send a "DELETE" request with the format "DELETE /pokemons/:pokemon_id"
      pokemonId = buttonClicked.getAttribute("data-pokemon-id");
      removePokemon(pokemonId);
    }
    if (buttonClicked.innerText == "Add Pokemon")
    {
      trainerId = buttonClicked.getAttribute("data-trainer-id");
      addPokemon(trainerId);
    }
  }
})
