const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    loadTrainers()
  });

function loadTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => populateTrainers(json))  
}

function populateTrainers(info){
    const main = document.getElementsByTagName("main")[0]
    info.forEach(trainer => {
        let div = document.createElement("DIV")
          div.setAttribute("class", "card")
          div.setAttribute("data-id", `${trainer.id}`)
          main.appendChild(div)
        let p = document.createElement("p")
          p.innerText = `${trainer.name}`
          div.appendChild(p)
        let button = document.createElement("button")
          button.setAttribute("data-trainer-id", `${trainer.id}`)
          button.innerText = "Add Pokemon"
          addNewPoke(button, trainer)
          div.appendChild(button)
        let ul = document.createElement("ul")
          div.appendChild(ul)

        trainer.pokemons.forEach(pokemon=> {
        let li = document.createElement("li")
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let releaseButton = document.createElement("button")
            releaseButton.setAttribute("class", "release")
            releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`)
            releaseButton.innerText = "Release"
            destroyPoke(releaseButton, pokemon)
            li.appendChild(releaseButton)
            ul.appendChild(li)   
        })
    })
}
    function destroyPoke(button, poke) {
        button.addEventListener("click", event => {
            fetch(POKEMONS_URL + '/' + `${poke.id}`, {
                method: "DELETE"
            }) 
        })
    }

    function addNewPoke(poke, trainer){
        poke.addEventListener("click", event => {
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                 body:JSON.stringify({"trainer_id": trainer.id})
            })
                
         })
    }

    

// need to make the events instant.  need to set parameters for amount of poke's on team