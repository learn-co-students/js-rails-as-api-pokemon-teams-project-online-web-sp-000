const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName("main")[0];

fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => {
    json.forEach( element => {
      createDivCard(element);
    })
  })

  function createDivCard(element) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("data-id", element.id)
    main.appendChild(div);

    createPTagWithName(element, div);

    createAddPokemonButton(element, div);

    createListOfPokemon(element, div);
  }

  function createPTagWithName(element, div) {
    const pTag = document.createElement("p");
    pTag.innerText = element.name
    div.appendChild(pTag);
  }

  function createAddPokemonButton(element, div) {
    const button = document.createElement("button");
    button.setAttribute("data-trainer-id", element.id)
    button.innerHTML = "Add Pokemon"
    button.addEventListener("click", function(){ addPokemon(element.id) })
    div.appendChild(button);
  }

  function createListOfPokemon(element, div) {
    const ul = document.createElement("ul");
    div.appendChild(ul);

    element.pokemons.forEach(poke => {
      createListItem(poke, ul);
    })
  }

  function createListItem(poke, ul) {
    const li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = `${poke.nickname} (${poke.species})`

    createReleaseButton(poke, li);
  }

  function createReleaseButton(poke, li) {
    const button = document.createElement("button");
    button.classList.add("release");
    button.setAttribute("data-pokemon-id", poke.id)
    button.innerHTML = "Release"
    li.appendChild(button);
  }

  //Above Page Load; below other functions

  function addPokemon(trainerId) {
    const div = document.querySelector(`[data-id='${trainerId}']`)
    const lis = div.querySelectorAll("li");

    if (lis.length < 6) {
      console.log("do something");
      //implement fetch with post
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          trainer_id: trainerId
        })
      }

      fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(json => {
          console.log(json)
        })
    } else {
      console.log("do nothing");
    }

    // JSON.stringify({
    //   dogName: "Byron",
    //   dogBreed: "Poodle"
    // })





    //first check number of pokemong under this trainer, if less than 6 do:
    //post request to localhost/pokemons (using fetch() with a config hash to do non-default post request); pass in trainer_id in the body
    //in the pokemon create action, set
    // name = Faker::Name.first_name
    // species = Faker::Games::Pokemon.name
    // Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    //and pass id to trainer.id
    //else: console log (not enough space) and be done

  }


  // fetch(POKEMONS_URL)
  // .then(resp => resp.json())
  // .then(json => console.log(json));
