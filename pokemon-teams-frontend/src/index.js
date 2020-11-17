const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName("main")[0]

document.addEventListener("DOMContentLoaded", () => {
    addTrainers();
})

function addTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(object => {
        showTrainers(object);
    })
}

function showTrainers(obj) {
    let trainers = obj.data;
    trainers.forEach(trainer => {
        let attributes = trainer.attributes
        let card = document.createElement("div")
        let id = parseInt(trainer.id)
        card.setAttribute("data-id", `${id}`)
        let trainerName = attributes.name
        let name = document.createElement("p")
        name.innerText = trainerName
        card.appendChild(name);

        let btn = document.createElement("button")
        btn.setAttribute("data-trainer-id", `${id}`)
        btn.innerText = "Add Pokemon"
        btn.addEventListener("click", function(click) {
            let trainerId = click.target.getAttribute("data-trainer-id")
            let team = document.querySelector(`div[data-id="${trainerId}"] ul`)

            if (team.children.length < 6) {
                createNewPokemon(click)
            }
        })
        card.appendChild(btn);

        let trainerPokemons = showTrainersPokemons(trainer, card)
        main.appendChild(card)
    })
}

function createNewPokemon(object) {
    let trainerId = object.target.getAttribute("data-trainer-id")
    let data = {
        "trainer_id": trainerId
    }
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(result => {
        let nickname = result.nickname
        let species = result.species
        let id = result.id
        let trainerId = result.trainer_id
        let li = document.createElement("li")
        let rlsBtn = document.createElement("button")
        let team = document.querySelector(`div[data-id="${trainerId}"] ul`)
        rlsBtn.addEventListener("click", (event) => {
            deletePokemon(event)
        })
        rlsBtn.setAttribute("class", "release")
        rlsBtn.setAttribute("pokemon-id", `${id}`)
        rlsBtn.innerText = "Release"
        li.innerText = `${nickname} (${species})`
        li.appendChild(rlsBtn)
        team.appendChild(li)
    })
}

function showTrainersPokemons(trainer, card) {
    let pokemonListElement = document.createElement("ul")
    let trainerId = trainer.id
    fetch(POKEMONS_URL)
    .then(response => response.json())
    .then(object => {    
        let trainerPokeList = getTrainerPokemons(object, trainerId)
        trainerPokeList.forEach(pokemonObj => {
            let li = makeNewPokemonFromTrainers(pokemonObj)
            pokemonListElement.appendChild(li)
            card.appendChild(pokemonListElement)
        })
    })
}

function makeNewPokemonFromTrainers(pokemonObj) {
    let li = document.createElement("li")
    let pokeId = pokemonObj.id
    let species = pokemonObj.attributes.species
    let nickname = pokemonObj.attributes.nickname
    let rlsBtn = document.createElement("button")
    rlsBtn.addEventListener("click", (event) => {
        deletePokemon(event)
    })
    rlsBtn.setAttribute("class", "release")
    rlsBtn.setAttribute("pokemon-id", `${pokeId}`)
    rlsBtn.innerText = "Release"
    li.innerText = `${nickname} (${species})`
    li.appendChild(rlsBtn)
    return li
}

function deletePokemon(event) {
    event.preventDefault()
    let id = event.target.getAttribute("pokemon-id")
    console.log(id)
    fetch(POKEMONS_URL+`/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
      }
  })
  .then(response => console.log(response))
  .then(event.target.parentElement.remove())
  }

function getTrainerPokemons(object, id) {
    let trainerId = id
    let pokeArray = object.data
    let array = []
    pokeArray.forEach(pokeData => {
        let newId = parseInt(pokeData.relationships.trainer.data.id)
        if (trainerId == newId) {
            array.push(pokeData)
        }
    })
    return array
}