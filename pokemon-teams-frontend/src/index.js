const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    allTrainers()
})

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
    const main = document.querySelector("main")
    const div = document.createElement("div")
    const p = document.createElement("p")
    const addButton = document.createElement("button")
    const ul = document.createElement("ul")

    div.classList.add("card")
    div.setAttribute("data-id", trainer.id)
    addButton.setAttribute("data-trainer-id", trainer.id)
    addButton.innerHTML = "Add Pokemon"
    ul.id = trainer.id
    main.append(div)

    p.innerHTML = trainer.name
    div.append(p)
    p.appendChild(addButton)
    p.appendChild(ul)

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

        releaseButton.addEventListener("click", event => {
            releasePokemon(pokemon, event)
        })

        li.appendChild(releaseButton)
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
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        event.target.parentElement.remove()
    })
}