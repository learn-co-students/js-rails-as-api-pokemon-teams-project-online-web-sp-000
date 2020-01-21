const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener('DOMContentLoaded',
    getTrainersAndPokemon()
);

const displayTrainer = trainer => {
return `<div class="card" id=${trainer.id} data-id=${trainer.id}><p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul id="pokemon-container${trainer.id}" >
    </ul>
</div><br></br>`;
}

const displayPokemon = pokemon =>
`<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id=${pokemon.id} onclick="deletePokemon(${pokemon.id}, ${pokemon.trainer_id})">Release</button></li>`

function getTrainersAndPokemon() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => {
        const trainersList = document.querySelector('#trainers');
        json.forEach(portion => {
            trainersList.innerHTML += displayTrainer(portion);
            addButton = document.querySelector(`[data-trainer-id="${portion.id}"]`)
            addPokemonButton(addButton, portion)
            const specificTrainer = document.getElementById(portion.id).querySelector("ul")
            const trainerPokemon = portion["pokemons"][0]["trainer_id"]
            if (trainerPokemon === portion.id) {
                portion["pokemons"].forEach(portion1 => {
                    specificTrainer.innerHTML += displayPokemon(portion1)
                })
            }
        })
    })
}

function renderPokemon(trainer_id) {
    const pokemonArgument = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify({
            trainer_id: trainer_id
        })
    }
    fetch(POKEMONS_URL, pokemonArgument)
    .then((response) => {
        return response.json()
      }) .then(function(pokemon) {
        pokemonList.innerHTML += displayPokemon(pokemon);
      })
      window.location.reload()
}


function addPokemonButton() {
    pokemonList = document.querySelector('#trainers').querySelectorAll("div")
    const addButtons = document.querySelectorAll('button')
    addButtons.forEach(specificPokemon => {
        specificPokemon.addEventListener('click', event => {
            event.preventDefault()
            renderPokemon(event.target.dataset.trainerId)
        })
    })
}

function deletePokemon(pokemonId, trainer_id){
    fetch(POKEMONS_URL + `/${pokemonId}`, {
      method: "delete",
    })
    .then(response => response.json())
    .then(response => {return response})
    const list = document.getElementById(`pokemon-container${trainer_id}`)
    window.location.reload()
} 