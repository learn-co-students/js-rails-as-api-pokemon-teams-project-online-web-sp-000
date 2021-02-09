const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    getTrainers()
});

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
     json.forEach(trainer => renderTrainer(trainer))
    })
  };

  const main = document.querySelector('main');

function renderTrainer(trainer) {
  const div = document.createElement('div');
   div.className = 'card';
   div.setAttribute('data-id', `${trainer['id']}`)
     const p = document.createElement('p');
     p.innerHTML = trainer['name'];
     div.appendChild(p);

     const btn = document.createElement('button');
     btn.innerHTML = 'Add Pokemon';
     btn.setAttribute('data-trainer-id', `${trainer['id']}`)
     div.appendChild(btn)
     const ul = document.createElement('ul');
     div.appendChild(ul);
     main.appendChild(div)

       trainer['pokemons'].forEach(pokemon => {
           renderPokemon(pokemon, trainer.id)
           
        })


     btn.addEventListener('click', (e) => { addPokemon(trainer['id']) }) ;
}

function renderPokemon(pokemon, trainerId ) {
    const card = document.querySelectorAll(`[data-id="${trainerId}"]`)[0];
    const ul = card.getElementsByTagName("ul")[0]
    const li = document.createElement('li');
    li.innerHTML = `${pokemon['nickname']}(${pokemon['species']})`;
    ul.appendChild(li);

    const rBtn = document.createElement('button')
    rBtn.className = "release";
    rBtn.innerHTML = "Release";
    rBtn.setAttribute('data-pokemon-id', `${pokemon['id']}`);
    li.appendChild(rBtn);
    rBtn.addEventListener('click', (e) => {
        releasePokemon(pokemon['id'], ul, li)
    }) ;
}

function addPokemon(trainer_id) {
    let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": trainer_id, 
        })
      };
       
    fetch(POKEMONS_URL, configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(pokemon) { renderPokemon(pokemon, trainer_id) })
        .catch(function(error) {
            document.body.innerHTML = error.message;
        });
    }

    function releasePokemon(pokemon_id, ul, li) {
        let conObj = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          };
           
        fetch(`${POKEMONS_URL}/${pokemon_id}`, conObj)
            .then(function(response) {
              return response.json();
            })
            .then(function() {
                ul.removeChild(li);
            })
            .catch(function(error) {
                document.body.innerHTML = error.message;
            });
        }