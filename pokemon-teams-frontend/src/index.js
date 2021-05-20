const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    getTrainers().then(trainers => {
        trainers.forEach(trainer => {
            displayTrainers(trainer);
        });
    })
})

function getTrainers() {
   return fetch(TRAINERS_URL).then(resp => resp.json());
}

function displayTrainers(trainer) {
    let main = document.querySelector("main");

    let div = document.createElement("div");
    div.setAttribute("class", "card");
    div.setAttribute("data-id", `${trainer.id}`);
    let p = document.createElement("p");
    p.innerText = trainer.name;
    let addBtn = document.createElement("button");
    addBtn.setAttribute("data-trainer-id", `${trainer.id}`);
    addBtn.innerText = "Add Pokemon";
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        addPokemon(e.target);
    });

    let ul = document.createElement("ul");
    trainer["pokemons"].forEach(pokemon => {
        displayPokemon(pokemon, ul);
    })
    div.append(p, addBtn, ul);
    main.append(div);
}

function displayPokemon(pokemon, listElement) {
    let li = document.createElement("li");
    let releaseBtn = document.createElement("button");
    releaseBtn.setAttribute("class", "release");
    releaseBtn.setAttribute("data-pokemon-id", `${pokemon.id}`);
    releaseBtn.innerText = "Release";
    releaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        releasePokemon(e.target);
    });
    li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `;
    li.append(releaseBtn);
    listElement.appendChild(li);
}

function addPokemon(e) {
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "trainer_id": parseInt(e.getAttribute("data-trainer-id"))
        })
    }
    fetch(POKEMONS_URL, configObject).then(resp => resp.json()).then(pokemon => {
        displayPokemon(pokemon, e.nextSibling);
    });
}

function releasePokemon(e) {
    let configObject = {
        method: "DELETE",
    };
    fetch(`${POKEMONS_URL}/${parseInt(e.getAttribute("data-pokemon-id"))}`, configObject).then(resp => resp.json()).then(pokemon => {
        e.parentElement.remove();
        console.log(`${pokemon.nickname} deleted`);
    });
}