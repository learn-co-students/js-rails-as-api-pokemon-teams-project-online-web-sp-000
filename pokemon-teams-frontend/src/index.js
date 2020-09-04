const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers();  
  });
  

function fetchTrainers() {
   fetch('http://localhost:3000/trainers')
   .then(resp => resp.json())
   .then(json => displayTrainers(json));
}


function displayTrainers(data) {
    const main = document.getElementById('main');

    for (trainer of data) {
        const card = document.createElement('div');
        card.classList.add("card");
        card.dataset.id = trainer.id;
        const name = document.createElement('p');
        name.innerText = trainer.name; 
        card.appendChild(name);

        const button = document.createElement('button');
        button.dataset.trainerId = trainer.id;
        button.innerText = "Add Pokemon";
        button.addEventListener('click', event => {
            addPokemon(event.target);
          });
        card.appendChild(button);

        const list = document.createElement('ul');
        const pokemons = trainer.pokemons;
        for (pokemon of pokemons) {
            const li = document.createElement('li');
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            const release = document.createElement('button');
            release.classList.add('release');
            release.dataset.pokemonId = pokemon.id;
            release.innerText = "Release";
            release.addEventListener('click', event => {
                removePokemon(event.target);
              });
            li.appendChild(release);
            list.appendChild(li);
        }
        card.appendChild(list);
        main.appendChild(card);
    }
}

function addPokemon(data) {
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        trainer_id: parseInt(data.dataset.trainerId),
      })
  })
      .then(function(response) {
          return response.json();
        })
        .then(function(object) {
        addPokemonToList(object);
        });
}

function addPokemonToList(object) {
    let trainer = document.querySelector(`[data-id="${object.trainer_id}"]`);

    const li = document.createElement('li');
    li.innerText = `${object.nickname} (${object.species})`;
    const release = document.createElement('button');
    release.classList.add('release');
    release.dataset.pokemonId = object.id;
    release.innerText = "Release";
    li.appendChild(release);

    trainer.lastElementChild.appendChild(li) ;
}

function removePokemon(data) {
    fetch(`http://localhost:3000/pokemons/"${data.dataset.pokemonId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        
    })
})
    .then(function(response) {
        return response.json();
        })
        .then(function(object) {
        removePokemonFromList(object);
        });
}

function addPokemonToList(object) {
    let trainer = document.querySelector(`[data-id="${object.trainer_id}"]`);

    
}
