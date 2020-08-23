
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", ()=>{
    getData();
})

function getData() {
    return fetch(TRAINERS_URL).then(response => response.json()).then(json => renderTrainer(json));
}

function renderTrainer(jsonData){
    const main = document.querySelector("main");
    // console.log([...new Set(results.map(e=> e.trainer.name))])
    
    jsonData.forEach((trainer)=>{
        const div = document.createElement("div");
        const p = document.createElement("p")
        const button = document.createElement("button");
        const ul = document.createElement("ul");
        
        div.className = "card"
        div.setAttribute("data-id", trainer.id)
        main.appendChild(div)
        button.setAttribute("data-trainer-id", trainer.id)
        button.innerText = "Add Pokemon"
        p.innerText = trainer.name
        button.addEventListener("click", createPokemon)

        div.appendChild(p)
        p.after(button)
        button.after(ul)

        trainer.pokemons.forEach((pokemon)=>{ renderPokemon(pokemon);})
    })
}

function renderPokemon(pokemon) {
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li");
    const button = document.createElement("button");

    li.innerText = pokemon.nickname.concat(` (${pokemon.species})`)
    button.className = "release"
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerText = "Release"
    button.addEventListener("click", releasePokemon)
    
    li.appendChild(button)    
    ul.appendChild(li)
}

function createPokemon(e){
    const configurationObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ trainer_id: e.target.dataset.trainerId})
    }

    fetch(POKEMONS_URL, configurationObj)
    .then(function(response) { return response.json()})
    .then(function(object) { 
        if(object.message) {
            button = e.target
            const span = document.createElement("span")
            span.innerText = object.message
            span.style = "padding-left: 10px; font-size: 15px; color: red"
            
            button.after(span)
            setTimeout(()=>{span.remove();}, 3000)
        } else {
            renderPokemon(object)
        }
    })
    .catch(error => console.log(error))
}

function releasePokemon(e) {
    const configurationObj = {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                    "Accept": "application/json"
        },
    }

    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configurationObj)
    e.target.parentNode.remove()
}
