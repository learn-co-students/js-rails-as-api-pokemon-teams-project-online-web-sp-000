
// CREATES TRAINER CARD ELEMENT GIVEN A TRAINER
function createCard(trainer) {
    // 1 create div.card data-id=trainer.id
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute('data-id', trainer.id);
    // 2 p textContent = trianer.name & append to div
    let trainerName = document.createElement("p");
    trainerName.textContent = trainer.name;
    card.appendChild(trainerName);
    // 3 create button data-trainer-id=trainer.id 
    // textContent = "Add Pokemon"
    let addPokemon = document.createElement("button");
    addPokemon.setAttribute("data-trainer-id", trainer.id);
    addPokemon.textContent = "Add Pokemon";
    addPokemon.addEventListener("click", (e) => {
        let list = e.target.parentElement.querySelector("ul");
        createPokemon(trainer.id, (data) => {
            list.appendChild(createListItem(data));
        });
    });
    card.appendChild(addPokemon);
    let teamList = document.createElement("ul");
    for (const pokemon of trainer.pokemons) {
        teamList.appendChild(createListItem(pokemon))
    }
    card.appendChild(teamList);
    return card
}
// pulls trainer data from trainers endpoint
function getTrainers(callback) {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then((data) => {
        callback(data)
    })
}

function createListItem(pokemon) {
    let li = document.createElement("li");
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    let release = createReleaseButton(pokemon.id);
    li.appendChild(release);        
    return li
}

function createReleaseButton(pokemon_id) {
    let releaseButton = document.createElement("button");
    releaseButton.classList.add("release");
    releaseButton.setAttribute("data-pokemon-id", pokemon_id)
    releaseButton.textContent = 'Release';
    releaseButton.addEventListener("click", (e) => {
        deletePokemon(e.target.getAttribute("data-pokemon-id"));
        e.target.parentNode.remove();
    })
    return releaseButton
}
function createPokemon(trainer_id, callback) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            trainer_id: trainer_id
        })
    })
    .then(resp => resp.json())
    .then(data => callback(data))
    .catch((error) => {
        console.log(`${error} Error has occurred!`)
    })
}
function deletePokemon(pokemon_id) {
    fetch(`${POKEMONS_URL}/${pokemon_id}`, {method: "DELETE"})
    .then(res => res.text())
    .then(data => data)
}

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const CONTAINER = document.querySelector("main");


document.addEventListener('DOMContentLoaded', () => {
    // renderTrainers();
    getTrainers((trainers) => {
        for (const trainer of trainers) {
            CONTAINER.appendChild(createCard(trainer))
        }
    });
});





/*
6. append div to dom


<div class="card" data-id="1">
        <p>Prince</p>
        <button data-trainer-id="1">Add Pokemon</button>
        <ul>
          <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
          <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
          <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
          <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
          <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
        </ul>
      </div>

 */