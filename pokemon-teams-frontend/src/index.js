const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")


document.addEventListener("DOMContentLoaded", () => loadTrainers())
    const loadTrainers = () => {        
        fetch (TRAINERS_URL)
        .then(res => res.json())
        .then (json => { console.log(json)
          json.data.forEach(trainer => renderTrainer(trainer.attributes))
          json.data.forEach(trainer.pokemon => renderPokemon(trainer.relationships))
        })
    // const loadPokemons = () => {
    //     fetch(POKEMONS_URL)
    //     .then(res => res.json())
    //     .then (json => { console.log(json.data.attributes)
    //         json.data.forEach(pokemon => renderPokemon(pokemon))
    //     })
    // }
    }

    const renderTrainer = (trainerHash) => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        const button = document.createElement("button")
        const ul = document.createElement("ul")

        div.setAttribute("class", "card")
        div.setAttribute("data-id", trainerHash.id)
        p.innerHTML = trainerHash.name
        button.setAttribute("data-trainer-id", trainerHash.id)
        button.innerHTML = "Add Pokemon"
         

        div.appendChild(p)
        div.appendChild(button)
        div.appendChild(ul)

        main.appendChild(div)
        // trainerHash.relationships.pokemons.forEach(pokemon => renderPokemon(pokemon))
    }
    const renderPokemon = (pokemonHash) => {

        const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
        const li = document.createElement("li")
        const button = document.createElement("button")

        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        button.setAttribute("class", "release")
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.innerHTML = "Release"

        li.appendChild(button)
        ul.appendChild(li)
    }
// need fetch request for Trainers
// need fetch request for Pokemons
// 