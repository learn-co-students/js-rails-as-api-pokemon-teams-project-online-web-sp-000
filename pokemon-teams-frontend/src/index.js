const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
let main = document.getElementsByTagName('main')[0];

document.addEventListener('DOMContentLoaded', () => {
  fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    for(let element of object) {
      let thisDiv = document.createElement('div');
      thisDiv.className = "card";
      thisDiv.setAttribute('data-id', element.id);

      let thisName = document.createElement('p');
      thisName.innerHTML = element.name;
      thisDiv.appendChild(thisName);

      let addPokemonBtn = document.createElement('button');
      addPokemonBtn.innerText = "Add Pokemon";
      addPokemonBtn.addEventListener('click', () => {
        addPokemonToTrainer(element.id.toString());
      });
      thisDiv.appendChild(addPokemonBtn);

      let pokemonsList = document.createElement('ul');

      for(let pokemon of element.pokemons) {
        let newLi = document.createElement('li');
        newLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
        let releaseBtn = document.createElement('button');
        releaseBtn.innerText = "Release";
        releaseBtn.className = "release";
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id);
        releaseBtn.addEventListener('click', () => {
          newLi.remove();
          removePokemon(pokemon.id);
        })

        newLi.appendChild(releaseBtn);
        pokemonsList.appendChild(newLi);
      }

      thisDiv.appendChild(pokemonsList);
      main.appendChild(thisDiv);
    }
  })
})

function addPokemonToTrainer(trainerId) {
  const formData = {
    trainer_id: trainerId
  };

  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  };

  fetch(POKEMONS_URL, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    putNewPokemonOnPage(json);
  })
  .catch(function(error) {
    console.log(error);
    console.log('Cannot have more than 6 pokemon on one team.')
  });
}

function putNewPokemonOnPage(json) {
  let trainers = document.getElementsByClassName('card');
  let trainer;
  for(let element of trainers) {
    if(element.getAttribute('data-id') == json.trainer_id) {
      trainer = element;
    }
  }

  let pokemonList;

  for(const element of trainer.children) {
    if(element.tagName.toLowerCase() == 'ul') {
      pokemonList = element;
    }
  }

  let newLi = document.createElement('li');
  newLi.innerText = `${json.nickname} (${json.species})`;
  let releaseBtn = document.createElement('button');
  releaseBtn.innerText = "Release";
  releaseBtn.className = "release";
  releaseBtn.setAttribute('data-pokemon-id', json.id);
  releaseBtn.addEventListener('click', () => {
    newLi.remove();
    removePokemon();
  })

  newLi.appendChild(releaseBtn);
  pokemonList.appendChild(newLi);
}

function removePokemon(pokemonId) {
  const configObj = {
    method: 'DELETE'
  }

  fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
  .then(function(response) {
    console.log(response)
  })
}
