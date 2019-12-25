const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const mainDiv = document.querySelector("main");

document.addEventListener("DOMContentLoaded", () => {
  renderTrainers();
});

const renderTrainers = async () => {
  try {
    const trainers = await getTrainers();
    for (const trainer of trainers) {
      buildCard(trainer);
    }
  } catch (error) {
    console.log(error);
  }
};

const getTrainers = async () => {
  try {
    const response = await fetch(`${TRAINERS_URL}`);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
};

const buildCard = trainer => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const p = document.createElement("p");
  p.textContent = trainer.attributes.name;

  const addButton = document.createElement("button");
  addButton.setAttribute("data-trainer-id", trainer.id);
  addButton.textContent = "Add pokemon";
  addButton.addEventListener("click", async e => {
    if (list.children.length < 6) {
      const newPokemon = await addPokemon(
        e.target.getAttribute("data-trainer-id")
      );
      renderPokemon(newPokemon, list);
    }
  });

  const list = document.createElement("ul");
  list.classList.add("pokemon-roster");
  renderPokemonList(trainer, list);
  cardDiv.append(p, addButton, list);
  mainDiv.append(cardDiv);
};

const renderPokemonList = async (trainer, parentNode) => {
  try {
    const pokemons = await getPokemons(trainer);
    for (const pokemon of pokemons) {
      const attrs = pokemon.attributes;
      const li = document.createElement("li");
      li.textContent = `${attrs.nickname} (${attrs.species})`;

      const button = document.createElement("button");
      button.classList.add("release");
      button.setAttribute("data-pokemon-id", pokemon.id);
      button.addEventListener("click", e => {
        releasePokemon(e.target.getAttribute("data-pokemon-id"));
        li.remove();
      });

      li.append(button);
      parentNode.append(li);
    }
  } catch (e) {
    console.log(`Error when getting pokemon: ${e}`);
  } finally {
  }
};
const renderPokemon = (pokemon, parentNode) => {
  const attrs = pokemon.data.attributes;
  const li = document.createElement("li");
  li.textContent = `${attrs.nickname} (${attrs.species})`;

  const button = document.createElement("button");
  button.classList.add("release");
  button.setAttribute("data-pokemon-id", pokemon.data.id);
  button.addEventListener("click", e => {
    releasePokemon(e.target.getAttribute("data-pokemon-id"));
    li.remove();
  });

  li.append(button);
  parentNode.append(li);
};

const getPokemons = async trainer => {
  try {
    const response = await fetch(`${TRAINERS_URL}/${trainer.id}`);
    const json = await response.json();
    return json.included;
  } catch (error) {
    console.log(error);
  } finally {
  }
};

const releasePokemon = async id => {
  try {
    const response = await fetch(`${POKEMONS_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(`There was an error releasing the pokemon: ${e}`);
  } finally {
  }
};

const addPokemon = async trainer_id => {
  try {
    const response = await fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ trainer_id: trainer_id })
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(`Something went wrong adding a pokemon: ${e}`);
  } finally {
  }
};
