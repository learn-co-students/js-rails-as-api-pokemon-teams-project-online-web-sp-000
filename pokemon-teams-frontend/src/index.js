const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {
    trainersData()
})


function trainersData(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => trainersCard(data))
}

function trainersCard(trainer){
    let main = document.querySelector("body > main")

    for(let i = 0; i < trainer.length; i++) {
        let div = document.createElement("div")
        div.className = "card";
        div.dataset.id = trainer[i].id;
        let p = document.createElement('p')
        p.innerText = `${trainer[i].name}`
        div.appendChild(p);

        let addBtn = document.createElement('button')
        addBtn.id = "add-button";
        addBtn.dataset.trainerId = `${trainer[i].id}`
        addBtn.innerText = "Add Pokemon";
        div.appendChild(addBtn)
        addBtn.addEventListener("click", fetchAddPokemon);

        let ul = document.createElement("ul")
        ul.className = "ul";

        trainer[i].pokemons.forEach(acquiredPokemon);

        function acquiredPokemon(pokemon) {
            let li = document.createElement("li");
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            let btn = document.createElement("button");
            btn.innerText = "Release"
            btn.dataset.pokemonId = `${pokemon.id}`
            btn.className = "release"
            li.appendChild(btn);
            btn.addEventListener("click", fetchDeletePokemon);
            ul.appendChild(li)
            div.appendChild(ul)
        }

        main.appendChild(div);
    }
}

function fetchAddPokemon(event){
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          trainer_id: event.target.dataset.trainerId
      })
    })
      .then((resp) => resp.json())
      .then((data) => addPokemon(data));
}


function addPokemon(pokemon) {
  let pokemonCard = document.createElement('li')
  pokemonCard.id = `pokemon-${pokemon.id}`
  pokemonCard.innerText = `${
    pokemonNicknames[Math.floor(Math.random() * pokemonNicknames.length)]
  } (${pokemonSpecies[Math.floor(Math.random() * pokemonNicknames.length)]})`;
  let release = document.createElement("button");
  release.className = "release";
  release.innerText = "Release";
  release.addEventListener("click", fetchDeletePokemon);
  pokemonCard.appendChild(release);

  release.dataset.pokemonId = pokemon.id;

  let ul = document.getElementsByTagName('ul')[`${pokemon.trainer_id - 1}`]
  ul.appendChild(pokemonCard)
}

function fetchDeletePokemon(event){
    fetch(POKEMONS_URL + `/${event.target.dataset.pokemonId}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(data => releasePokemon(data.id));
}

function releasePokemon(id) {
    const pokemonId = id;
    const pokemonLi = document.querySelector(
      '[data-pokemon-id="' + pokemonId + '"]'
    ).parentNode;
    pokemonLi.parentNode.removeChild(pokemonLi);
};

// Generating a Random Nickname for a Pokemon
// pokemonNicknames[Math.floor(Math.random() * pokemonNicknames.length)];

let pokemonNicknames = []
fetch(POKEMONS_URL)
.then(resp => resp.json())
.then(data => {
    for(let n = 0; n < data.length; n++) {
        pokemonNicknames.push(data[n].nickname)
    }
})

let pokemonSpecies = [];
fetch(POKEMONS_URL)
  .then((resp) => resp.json())
  .then((data) => {
    for (let o = 0; o < data.length; o++) {
      pokemonSpecies.push(data[o].species);
    }
  });