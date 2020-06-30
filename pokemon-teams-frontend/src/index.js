const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then((trainers) => {
            for (let [index, trainer] of trainers.entries()) {
                createCard(trainer, index)
            }
        })
}

function addPokemon() {
    let trainerId = event.target.getAttribute('data-trainer-id')
    data = {trainer_id: trainerId}
    dataOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(POKEMONS_URL, dataOptions)
    .then(resp => resp.json())
    .then(function(pokemon) {
        console.log(pokemon)
        let div = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
        console.log(div.getElementsByTagName("ul"))
        let list = div.getElementsByTagName("ul")[0]
        let li = document.createElement('li')
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        list.appendChild(li)

        let releaseButton = document.createElement("button")
        releaseButton.setAttribute("data-pokemon-id",pokemon.id)
        releaseButton.classList.add("release")
        releaseButton.innerText = "Release"
        releaseButton.addEventListener("click", releasePokemon)
        li.appendChild(releaseButton)
    })
}

function releasePokemon(event) {
    let pokemonId = event.target.getAttribute('data-pokemon-id')
    data = {pokemon_id: pokemonId}
    dataOptions = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(`http://localhost:3000/pokemons/${pokemonId}`, dataOptions)
    .then(resp => resp.json())
    .then(function(pokemon) {
        let button = document.querySelector(`[data-pokemon-id="${pokemon.id}"]`)
        let li = button.parentNode
        li.parentNode.removeChild(li)
    })
}


function createCard(trainer, index) {
    let main = document.getElementsByTagName("main")[0]
    let div = document.createElement('div')
    div.setAttribute("data-id",index + 1)
    div.className = "card"

    let p = document.createElement('p')
    p.innerText = trainer.name
    div.appendChild(p)

    let button = document.createElement("button")
    button.setAttribute("data-trainer-id",index + 1)
    button.innerText = "Add Pokemon"
    button.addEventListener("click", addPokemon)
    div.appendChild(button)

    let list = document.createElement("ul")
    for (creature of trainer.pokemons) {
        let li = document.createElement('li')
        li.innerText = `${creature.nickname} (${creature.species})`
        list.appendChild(li)

        let releaseButton = document.createElement("button")
        releaseButton.setAttribute("data-pokemon-id",creature.id)
        releaseButton.classList.add("release")
        releaseButton.innerText = "Release"
        releaseButton.addEventListener("click", releasePokemon)
        li.appendChild(releaseButton)
    }
    div.appendChild(list)

    main.appendChild(div)

}

getTrainers()