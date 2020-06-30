const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => renderTrainers(json));
}

function renderTrainer(json) {
  const main = document.getElementsByTagName("main")[0];
  const div = document.createElement("div");
  div.className = "card";
  div.id = `trainer-${json.id}`;
  const p = document.createElement("p");
  p.innerHTML = `${json.name}`;
  const addBtn = document.createElement("BUTTON");
  addBtn.className = "add";
  addBtn.innerHTML = "Add Pokemon";
  div.appendChild(p);
  div.appendChild(addBtn);
  div.appendChild(renderPokemon(json.pokemons));
  main.appendChild(div);
}

function renderTrainers(json) {
  const numOfTrainers = json.length;
  for(let i = 0; i < numOfTrainers; i++) {
    renderTrainer(json[i]);
  }
}

function renderPokemon(pokemonJson) {
  const ul = document.createElement("UL");
  for (let i = 0; i < pokemonJson.length; i++) {
    const li = document.createElement("LI");
    li.innerHTML = `${pokemonJson[i].nickname} (${pokemonJson[i].species}) `;
    const btn = document.createElement("BUTTON");
    btn.className = "release";
    btn.id = pokemonJson[i].id;
    btn.innerHTML = "Release";
    li.appendChild(btn);
    ul.appendChild(li);
  }
  return ul;
}

function addNewPokemonToTrainer(json) {
  const trainerDiv = document.querySelector(`#trainer-${json.trainer_id}`);
  const newLi = document.createElement("LI");
  newLi.innerHTML = `${json.nickname} (${json.species}) `;
  const btn = document.createElement("BUTTON");
  btn.className = "release";
  btn.id = json.id;
  btn.innerHTML = "Release";
  newLi.appendChild(btn);
  trainerDiv.getElementsByTagName("UL")[0].appendChild(newLi);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchTrainers();
  document.addEventListener("click", event => {
    if (event.target.className === "release") {
      fetch(`${POKEMONS_URL}/${event.target.id}`, {
        method: "DELETE"
      })
      event.target.parentNode.remove();
    } else if (event.target.className === "add") {
      if (event.target.parentNode.getElementsByTagName("LI").length < 6) {
        fetch(POKEMONS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            trainerId: `${event.target.parentNode.id.split('-')[1]}`,
          })
        })
        .then(response => response.json())
        .then(json => addNewPokemonToTrainer(json));
      } else {
        console.log("too many pokemon");
      }
    } else {
      return;
    }
  });
});
