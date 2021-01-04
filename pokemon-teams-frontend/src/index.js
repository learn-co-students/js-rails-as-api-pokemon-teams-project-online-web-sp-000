const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


async function getapi(url) {
    let roster = document.querySelector('#roster');
    fetch(url).then(response => response.json()).then(object => {
        console.log(object);
        for (const [i,trainer] of object.entries()) {
            let trainerCard = document.createElement('div');
            trainerCard.className = "card";
            trainerCard.setAttribute('data-id' , trainer.id); 
            trainerCard.innerHTML = trainer.name;
            let addPokemonButton = document.createElement('button');
            addPokemonButton.innerHTML = "Add Pokemon";
            addPokemonButton.addEventListener("click", addPokemon);
            addPokemonButton.setAttribute('data-addpoke-id' , trainer.id); 
            trainerCard.appendChild(addPokemonButton);

            let teamList = document.createElement('ul');
            trainerCard.appendChild(teamList);

            for (const p of object[i].pokemon) {
                console.log(p);
                let pokemonMember = document.createElement('li');
                pokemonMember.innerHTML = `${p.nickname} (${p.species})`;
                pokemonMember.setAttribute('data-pokemon-id', p.id);
                let releasePokemonButton = document.createElement('button');
                releasePokemonButton.innerHTML = "Release";
                releasePokemonButton.setAttribute('data-releasepoke-id' , p.id);
                releasePokemonButton.setAttribute('class' , 'release'); 
                // releasePokemonButton.addEventListener("click", function(e)
                // {
                //   alert("REMOVE: " + e.target.pokemonMember.innerHTML);
                // });
                releasePokemonButton.addEventListener("click", releasePokemon);
                pokemonMember.appendChild(releasePokemonButton);
                teamList.appendChild(pokemonMember);
            }
            roster.appendChild(trainerCard);
          }
        });
}

function listTrainers() {
    getapi(TRAINERS_URL);
}

function releasePokemon(e) {
    console.log(`Goodbyeeee ${e.target.dataset.releasepokeId}`);
    let boot = e.target.dataset.releasepokeId;
    // remove_pokemon(boot);
    // On Click - delete pokemon.id from database

    fetch(`${POKEMONS_URL}/${boot}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
      // body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then((data) => {
      console.log(`Success: ${JSON.stringify(data)}`);
    })
    .catch((error) => {

      console.error('Errorrrr:', error);
    });
    console.log(`${e.target.dataset.id} has left the party`);
    document.querySelectorAll(`[data-pokemon-id="${boot}"]`)[0].remove();
  }

function addPokemon(e) {
    let trainerID = e.target.dataset.addpokeId;
    // let trainerName = boot;
    let p = {};
    fetch(`${POKEMONS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({trainer: trainerID})
    })
    .then(response => response.json())
    .then((data) => {
      console.log(`Success: ${JSON.stringify(data)}`);
      console.log(`d ${data}`);
      p = data;
      let pNew = document.createElement('li');
      document.querySelectorAll(`[data-id="${trainerID}"]`)[0].lastElementChild.appendChild(pNew);

      // pNew.innerHTML = `pop`;
      pNew.innerHTML = `${p.nickname} (${p.species})`;
      pNew.setAttribute('data-pokemon-id', p.id);
      let releasePokemonButton = document.createElement('button');
      releasePokemonButton.innerHTML = "Release";
      releasePokemonButton.setAttribute('data-releasepoke-id' , p.id);
      releasePokemonButton.setAttribute('class' , 'release'); 
      releasePokemonButton.addEventListener("click", releasePokemon);
      pNew.appendChild(releasePokemonButton);
    })
    .catch((error) => {
      console.error('Errorrrr:', error);
    });   
    
}

listTrainers();

