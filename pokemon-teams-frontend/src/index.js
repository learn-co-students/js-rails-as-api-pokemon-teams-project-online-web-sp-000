const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", getTrainers)

function getTrainers() {
    
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainers => {
            trainers.data.forEach(trainer => {
                addTrainer(trainer)
            })
        })          
}

function addTrainer(trainer) {
    // Assign Elements
    const main = document.querySelector("main")
    const cardDiv = document.createElement("div")
    const trainerP = document.createElement("p")
    const addPokeBtn = document.createElement("button")
    


    // Set Attributes and Content
    cardDiv.setAttribute("class", "card")
    trainerP.setAttribute("data-id", trainer.id)
    trainerP.textContent = trainer.attributes.name
    addPokeBtn.setAttribute("data-trainer-id", trainer.id)
    addPokeBtn.textContent = "Add Pokemon"
    
    addPokeBtn.addEventListener("click", event => {
        addPokemon(trainer, event)
    })
    
    
    const ul = document.createElement("ul")

    trainer.attributes.pokemons.forEach(pokemon => {
        const li = document.createElement("li")
        const releasePokeBtn = document.createElement("button")

        releasePokeBtn.setAttribute("class", "release")
        releasePokeBtn.setAttribute("data-pokemon-id", pokemon.id)
        releasePokeBtn.textContent = "Release"

        releasePokeBtn.addEventListener("click", event => {
            releasePokemon(pokemon, event)
        })

        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        li.appendChild(releasePokeBtn)
        ul.appendChild(li)
    })

    // Append Elements
    
    cardDiv.appendChild(trainerP)
    cardDiv.appendChild(addPokeBtn)
    cardDiv.appendChild(ul)

    
    main.append(cardDiv)   
}

// Event Handlers

function addPokemon(trainer, event) {
    event.preventDefault()
    const ul = event.target.parentElement.lastChild

    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": trainer.id
        })
    })
    .then(res => res.json())
    .then(result => {
        console.log(result)
        if(result["status"] === "error"){
            alert(result["message"])
        }
        else{
            newPokemon = result.data.attributes
            console.log("HELLO!!!!")
            console.log(`This newPokemon's id is${newPokemon.id}`)

            const li = document.createElement("li")
            const releasePokeBtn = document.createElement("button")

            releasePokeBtn.setAttribute("class", "release")
            releasePokeBtn.setAttribute("data-pokemon-id", newPokemon.id)
            releasePokeBtn.textContent = "Release"

            releasePokeBtn.addEventListener("click", event => {
                releasePokemon(newPokemon, event)
            })

            li.innerHTML = `${newPokemon.nickname} (${newPokemon.species})`
            li.appendChild(releasePokeBtn)
            ul.appendChild(li)
        }
        
    })
}

function releasePokemon(pokemon, event) {
    console.log(pokemon)
    console.log("Clicked!!!")
    event.preventDefault()

    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    // .then(res => {
    //         console.log(res)
    //      return res.json()
    //     })
    // .then(result => {
    //     console.log(result)
        event.target.parentElement.remove()
    // })
    
}




