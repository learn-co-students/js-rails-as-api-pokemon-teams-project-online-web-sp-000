const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const main = document.querySelector("main")

function makeCard(trainer) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", `${trainer.id}`);

  let p = document.createElement("p");
  p.innerText = `${trainer.name}`;
  let btn = document.createElement("button");
  btn.setAttribute("data-trainer-id", `${trainer.id}`);
  btn.innerText = "Add Pokemon";
  btn.addEventListener("click", event => addPokemon(event));
  let ul = document.createElement("ul");

  card.append(p, btn, ul);

  trainer.pokemons.forEach(pokemon => {
    let li = document.createElement("li");
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    let releaseButton = document.createElement("button");
    releaseButton.classList.add("release");
    releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`);
    releaseButton.innerText = "Release";
    releaseButton.addEventListener("click", event => releasePokemon(event));
    li.appendChild(releaseButton);
    ul.appendChild(li);
  });

  main.appendChild(card);
}

document.addEventListener("DOMContentLoaded", 
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(data => data.forEach(trainer => makeCard(trainer)))
  )

function addPokemon(event) {
  let id = event.target.getAttribute("data-trainer-id");
  let ul = event.target.nextElementSibling;
  let li = document.createElement("li");
  let addLI = function addLi(data) {
    li.innerText = `${data.nickname} (${data.species})`;
    let releaseButton = document.createElement("button");
    releaseButton.classList.add("release");
    releaseButton.setAttribute("data-pokemon-id", `${data.id}`);
    releaseButton.innerText = "Release";
    releaseButton.addEventListener("click", event => releasePokemon(event));
    li.appendChild(releaseButton);
    ul.appendChild(li);
  }

  fetch(POKEMONS_URL, {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({"trainer_id" : `${id}`})
  })
    .then(response => response.json())
    .then(data => addLI(data))
}

function releasePokemon(event) {
  event.preventDefault();
  let btn = event.target;
  let id = btn.getAttribute("data-pokemon-id");
  btn.parentElement.remove();
  
  fetch(POKEMONS_URL+`/${id}`, { method: "DELETE" })
}
