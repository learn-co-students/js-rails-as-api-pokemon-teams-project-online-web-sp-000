const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => renderTrainers(json));
}

function renderTrainers(json) {
  const main = document.getElementsByTagName("main")[0];
  const numOfTrainers = json.length;
  // let trainerCards = [];
  for(let i = 0; i < numOfTrainers; i++) {
    const div = document.createElement("div");
    div.className = "card";
    const p = document.createElement("p");
    p.innerHTML = `${json[i].name}`;
    div.appendChild(p);
    main.appendChild(div);
  }
}

fetchTrainers();