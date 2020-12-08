const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')


document.addEventListener('DOMContentLoad', fetchTrainers());

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => {
        renderTrainers(json)

    });
}

function renderTrainers(trainers) {
  
    trainers.forEach(trainer => {
        let div = document.createElement("DIV")
        div.className = "card";
        div.setAttribute("id", `${trainer.id}`)
        mainDiv.appendChild(div)
        let p = document.createElement("P")
        p.innerText = `${trainer.name}`
        div.appendChild(p)
        let addPokemon = document.createElement("BUTTON")
        addPokemon.setAttribute("id", `${trainer.id}`)
        addPokemon.innerText = "Add Pokemon"
        div.appendChild(addPokemon)


        addPokemon.addEventListener("click", (event) => {
            console.log(event.target.id)
            fetch(POKEMONS_URL, { 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({trainer_id: event.target.id})
                 
                
            })
            .then(response => response.json())
            .then(json => addAPokemon(json))
        })
        
        let ul = document.createElement("UL")
        div.appendChild(ul)

        trainer.pokemons.forEach(pokemon => {
            
            let li = document.createElement("LI")
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            ul.appendChild(li)
            let release = document.createElement("BUTTON")
            release.setAttribute("class", "release")
            release.setAttribute("id", `${pokemon.id}`)
            release.innerText = "Release"
            li.appendChild(release)

            release.addEventListener("click", e => {
                e.target.parentElement.remove()
                fetch(POKEMONS_URL + '/' + e.target.id, {method : 'DELETE'})
            })
        })
        
    })
}

function addAPokemon(pokemon) {
   
    let matchDiv = document.querySelectorAll('div')
    matchDiv.forEach(div => {
        if(div.id == pokemon.trainer_id) {
            let ul = div.querySelector("UL") 
    
            let newLi = document.createElement("LI")
            newLi.innerText = `${pokemon.nickname} (${pokemon.species})`
            ul.appendChild(newLi)
            let release = document.createElement("BUTTON")
            release.setAttribute("class", "release")
            release.setAttribute("id", `${pokemon.id}`)
            release.innerText = "Release"
            newLi.appendChild(release)
    
            release.addEventListener("click", e => {
                e.target.parentElement.remove()
                fetch(POKEMONS_URL + '/' + e.target.id, {method : 'DELETE'})
                })
        }
    }) 
}













