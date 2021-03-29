const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")


function trainerCard(trainer) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", `${trainer.id}`);

    let p = document.createElement("p");
    p.innerText = `${trainer.name}`;
    let button = document.createElement("button");
    button.setAttribute("data-trainer-id", `${trainer.id}`);
    button.innerText = "Add Pokemon";
    button.addEventListener = ("click", event => addPokemon(event));
    let ul = document.createElement("ul")

    card.append(p, button, ul);

    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement("li");
        li.innerText = `${pokemon.nickname} (${pokemon.special})`;
        let release = document.createElement("button");
        release.classList.add("release");        
        release.setAttribute("data-pokemon-id", `${pokemon.id}`);
        release.innerText = "Release";
        button.addEventListener = ("click", event => releasePokemon(event))
        li.appendChild(release);
        ul.appendChild(li);
    });

    main.appendChild(card);
}

document.addEventListener("DOMContentLoaded", 
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(data => data.forEach(trainer => trainerCard(trainer)))
)


function addPokemon(event) {
    let id = event.target.getAttribute("data-trainer-id");
    let ul = event.target.nextElementSibling;
    let li = document.createElement("li");
    let addItem = function addItem(data){
        li.innerText = `${data.nickname} (${data.species})`;
        let release = document.createElement("button")
        release.classList.add("release");
        release.setAttribute("data-pokemon-id", `${data.id}`);
        release.innerText = "Release";
        release.addEventListener = ("click", event => releasePokemon(event));
        li.appendChild(release);
        ul.appendChild(li);
    }

    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "trainer_id" : `${id}`
        })
        .then(response => response.json())
        .then(data => addItem(data))
    })

}

function releasePokemon(event) {
    event.preventDefault();
    let button = event.target;
    let id = button.getAttribute("data-pokemon-id");
    button.remove("li");
    fetch(POKEMONS_URL+`${id}`, {
        method:"DELETE"
    });
}