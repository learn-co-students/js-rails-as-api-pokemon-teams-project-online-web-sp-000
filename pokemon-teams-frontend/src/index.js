const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.onload = () => {
    trainersIndex()
}

function trainersIndex() {
    fetch('http://localhost:3000/trainers')
        .then(response => response.json())
        .then(trainers => {
            trainers.forEach(trainer => {
                const card = document.createElement("div")
                card.setAttribute("class", "card")
                card.setAttribute("data-id", trainer.id)

                const name = document.createElement("p")
                name.innerText = trainer.name

                const addBtn = document.createElement("button")
                addBtn.setAttribute("data-trainer-id", trainer.id)
                addBtn.innerText = "Add Pokemon"
                addBtn.addEventListener("click", () => addPokemon(trainer.id))

                const list = document.createElement("ul")

                trainer.pokemon.forEach(pokemon => {
                    createPokemon(pokemon, list)
                })

                card.appendChild(name)
                card.appendChild(addBtn)
                card.appendChild(list)

                document.querySelector("main").appendChild(card)
            })
        })
}

function createPokemon(pokemon, trainerList) {
    const list = trainerList
    const li = document.createElement("li")
    li.id = pokemon.id
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    const rmvBtn = document.createElement("button")
    rmvBtn.setAttribute("class", "release")
    rmvBtn.innerText = "Release"
    rmvBtn.setAttribute("data-pokemon-id", pokemon.id)
    rmvBtn.addEventListener("click", () => releasePokemon(pokemon.id))
    li.appendChild(rmvBtn)
    list.appendChild(li)
}

function releasePokemon(pokemonId) {

    const config = {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({ "id": pokemonId })
    }

    fetch(`http://localhost:3000/pokemons/${pokemonId}`, config)
        .then(response => response.json())
        .then(json => {
            pokemon = document.getElementById(pokemonId)
            pokemon.parentElement.removeChild(pokemon)
        })
}

function addPokemon(trainerId) {

    const params = {
        trainer_id: trainerId
    }

    const config = {
        method: "POST",
        headers: {

            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(params)
    }

    fetch('http://localhost:3000/pokemons', config)
        .then(response => response.json())
        .then(pokemon => {
            if (pokemon.message) {
                alert(pokemon.message)
            } else {
                const list = document.querySelector(`[data-id = "${trainerId}"] ul`)
                createPokemon(pokemon, list)
            }
        })
}
