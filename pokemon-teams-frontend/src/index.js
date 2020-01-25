const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(e){
    const mainCont = document.querySelector("main")
    let trainers
    let pokemons

    fetch('http://localhost:3000/trainers')
        .then(response => response.json())
        .then(object => {
            trainers = object.data
            pokemons = object.included

            for(let i = 0; i < trainers.length; i++) {
                let trainerName = document.createElement("p")
                trainerName.innerText = trainers[i].attributes.name

                let trainerInfo = document.createElement("div")
                trainerInfo.class = "card"
                trainerInfo.setAttribute("data-id", trainers[i].id)

                let addPokemonButton = document.createElement("button")
                addPokemonButton.innerText = "Add Pokemon"
                addPokemonButton.setAttribute("data-trainer-id", trainers[i].id)
                
                let pokemonList = document.createElement("ul")
                
                mainCont.appendChild(trainerName)
                mainCont.appendChild(trainerInfo)
                trainerInfo.appendChild(addPokemonButton)
                trainerInfo.appendChild(pokemonList)

                for(let j = 0; j < pokemons.length; j++) {
                    if(pokemons[j].attributes.trainer_id === parseInt(trainers[i].id)) {
                        let pokemon = document.createElement("li")
                        pokemon.innerText = `${pokemons[j].attributes.nickname} (${pokemons[j].attributes.species})`

                        let releaseButton = document.createElement("button")
                        releaseButton.className = "release"
                        releaseButton.innerText = "Release"
                        releaseButton.setAttribute("data-pokemon-id", pokemons[j].id)

                        pokemonList.appendChild(pokemon)
                        pokemon.appendChild(releaseButton)

                        releaseButton.addEventListener("click", function(){
                            let configObj = {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                },
                                body: JSON.stringify({
                                    "pokemon_id": j + 1
                                })
                            }
        
                            fetch(`http://localhost:3000/pokemons/${pokemons[j].id}`, configObj)
                                .then(response => response.json())
                                .then(object => {
                                    pokemonList.removeChild(pokemon)
                                })
                        })
                    }
                }

                addPokemonButton.addEventListener("click", function(){
                    let trainerTeam = document.querySelectorAll('[data-id]')
                    let teamSize = trainerTeam[i].querySelectorAll("li").length
                    
                    if(teamSize < 6) {
                        let configObj = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                "trainer_id": i + 1
                            })
                        }
    
                        fetch('http://localhost:3000/pokemons', configObj)
                            .then(response => response.json())
                            .then(object => {
                                let newPokemon = object.data
                                let pokemon = document.createElement("li")
                                pokemon.innerText = `${newPokemon.attributes.nickname} (${newPokemon.attributes.species})`
    
                                let releaseButton = document.createElement("button")
                                releaseButton.className = "release"
                                releaseButton.innerText = "Release"
                                releaseButton.setAttribute("data-pokemon-id", newPokemon.id)
    
                                pokemonList.appendChild(pokemon)
                                pokemon.appendChild(releaseButton)
                            })
                    }
                })
            }
        })
})