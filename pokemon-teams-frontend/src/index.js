const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  loadTrainers();
});


function loadTrainers() {
  getTrainers()
  .then(trainers => trainers.forEach(trainer => addTrainerToPage(trainer)));
}

function getTrainers() {
  return fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
}

function addTrainerToPage(trainer) {
  let main = document.getElementsByTagName('main')[0];

  let div = document.createElement('div');
  div.classList.add('card');
  div.setAttribute('data-id', trainer.id);

  let btn = document.createElement('button');
  btn.innerText = 'Add Pokemon'
  btn.setAttribute('data-trainer-id', trainer.id)

  btn.addEventListener('click', (e) => {
    addNewPokemon(e)
  })

  let p = document.createElement('p');
  p.innerText = trainer.name;

  let ul = document.createElement('ul');

  trainer.pokemons.forEach(pokemon => {
    addPokemonToTrainer(pokemon, ul);
  });

  div.append(p, btn, ul)
  main.append(div)

}

function addPokemonToTrainer(pokemon, ul){
  let li = document.createElement('li');
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;

  let btn = document.createElement('button');
  btn.classList.add('release')
  btn.innerText = 'Release'
  btn.setAttribute('data-pokemon-id', pokemon.id)
  btn.addEventListener('click', (e) => {
    releasePokemon(e, li)
  })

  li.append(btn)
  ul.append(li)
}

function addNewPokemon(e){
  e.preventDefault()

  let ul = e.target.parentElement.getElementsByTagName(
    'ul')[0]
  let numCurrentPokemon = ul.children.length;
  let trainerId = e.target.getAttribute('data-trainer-id');

  if (numCurrentPokemon < 6) {
    postNewPokemon(trainerId, ul)
  } else {
    alert("Too many pokemon!");
  }
}

function postNewPokemon(trainerId, ul){
  console.log('trying to add new pokemon')
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "trainer_id": trainerId
    })
  };

  return fetch(POKEMONS_URL, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      addPokemonToTrainer(object, ul)
    })
    .catch(function(error) {
      alert("Bad things!");
      console.log(error.message);
    });
}

function releasePokemon(e, li){
  console.log('trying to delete pokemon')
  let pokemonId = e.target.getAttribute('data-pokemon-id').toString();
  let delete_url = `${POKEMONS_URL}/${pokemonId}`

  return fetch(delete_url, {method: 'DELETE'})
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    li.parentNode.removeChild(li)
  })
  .catch(function(error) {
    alert("Bad things!");
    console.log(error.message);
  });
}
