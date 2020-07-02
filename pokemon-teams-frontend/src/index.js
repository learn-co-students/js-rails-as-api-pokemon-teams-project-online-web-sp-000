const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

//document.addEventListener("DOMContentLoaded")

document.addEventListener("DOMContentLoaded", allTrainers)

function allTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(trainer => {
          addTrainers(trainer)
      })
    })
}

function addTrainers(trainer) {
    const div = document.createElement("div") // Define all of our elements that we will use to assemble our trainer's teams
    const p = document.createElement("p")
    const addButton = document.createElement("button")
    const ul = document.createElement("ul")

    div.setAttribute("class", "card") // Assign attributes (classes and ids) to the different elements
    div.setAttribute("data-id", trainer.id)
    addButton.setAttribute("data-trainer-id", trainer.id)
    addButton.innerHTML = "Add Pokemon"
    ul.id = trainer.id
    p.innerHTML = trainer.name

    div.appendChild(p) // We incorporate all these elements into our div, which essentially puts them in a nice container
    div.appendChild(addButton)
    div.appendChild(ul)
    main.append(div)

    addButton.addEventListener("click", event => {
        addPokemon(trainer, event)
    })

    trainer.pokemons.forEach(pokemon => {
        const li = document.createElement("li")
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        ul.appendChild(li)

        const releaseButton = document.createElement("button")
        releaseButton.classList.add("release")
        releaseButton.setAttribute("data-pokemon-id", pokemon.id)
        releaseButton.innerHTML = "Release"
        li.appendChild(releaseButton)

        releaseButton.addEventListener("click", event => {
            releasePokemon(pokemon, event)
        })

    }) 
}

function addPokemon(trainer, event) {
    event.preventDefault() // Remember, this keeps our page from reloading after an event has been triggered

    const ul = event.target.parentElement.lastChild
    if(ul.children.length < 6) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trainer_id" : trainer.id
        })
    })
    .then(resp => resp.json())
    .then(newPokemon => {
            const li = document.createElement('li')
            li.innerHTML = `${newPokemon.nickname} (${newPokemon.species})`
            ul.appendChild(li) 
            const releaseButton = document.createElement('button')
            releaseButton.classList.add("release")
            releaseButton.setAttribute("data-pokemon-id", newPokemon.id)
            releaseButton.innerHTML = "Release"
            releaseButton.addEventListener("click", event => {
                releasePokemon(pokemon, event)
            })
            li.appendChild(releaseButton)
        }) 
    }
}

function releasePokemon(pokemon, event) {
    event.preventDefault()

    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    })
    .then(resp => resp.json())
    .then(data => {
        event.target.parentElement.remove()
    })
}