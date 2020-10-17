const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(event) {
    // first, I need to fetch all of the trainers from localhost:3000/trainers
    fetch("http://localhost:3000/trainers")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json[0].pokemons);
        createTrainers(json);
    })

    function createTrainers(trainers) {
        let main = document.getElementsByTagName('main')[0]

        for (const trainer of trainers) {
            let div = document.createElement('div')
            div.setAttribute('data-id', trainer.id)
            main.appendChild(div)
            let ul = document.createElement('ul')
            div.appendChild(ul)
            let addPoke = document.createElement('button')
            addPoke.setAttribute('data-trainer-id', trainer.id)
            addPoke.textContent = 'Add Pokemon'
            ul.appendChild(addPoke)
            addPoke.addEventListener('click', function(e) {
                let configObj = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({trainer_id: `${trainer.id}`})
                }
                fetch("http://localhost:3000/pokemons", configObj)
                .then(function(response) {
                    return response.json();
                })
                .then(function(object) {
                    createPokemon(object);
                })
            })

            for (const pokemon of trainer.pokemons) {
                createPokemon(pokemon)
            }

            function createPokemon(pokemon) {
                let li = document.createElement('li')
                li.textContent = `${pokemon.nickname} (${pokemon.species})`
                let releasePoke = document.createElement('button')
                releasePoke.setAttribute('class', 'release')
                releasePoke.setAttribute('data-pokemon-id', pokemon.id)
                releasePoke.addEventListener('click', function(event) {
                    let configObj = {
                        method: "DELETE", 
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({pokemon_id: `${pokemon.id}`})
                    }

                    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, configObj)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(object) {
                        let btn = document.querySelectorAll(`[data-pokemon-id='${pokemon.id}']`)[0]
                        let li = btn.parentElement
                        li.remove();
                        btn.remove();
                    })
                })
                releasePoke.textContent = 'Release'
                li.appendChild(releasePoke)
                ul.appendChild(li)
            }
        }
    }

})