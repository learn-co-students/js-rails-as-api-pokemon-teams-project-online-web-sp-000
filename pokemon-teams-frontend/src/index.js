const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch('http://localhost:3000/trainers')
.then(resp => resp.json())
.then(json => renderTrainers(json))

function renderTrainers(json) {
    
    for (let trainerObj of json) {
        
        // The next block of code will build out cards for the trainers with their associated names.

        const div = document.createElement('div')
        div.classList.add('card')
        div.setAttribute('data-trainer-id', trainerObj.id)
        
        const p = document.createElement('p')
        p.innerHTML = trainerObj.name
        div.appendChild(p)

        let card = document.querySelector('main').appendChild(div)

        // The next block of code will build out 'Add Pokemon' buttons for each card.

        const button = document.createElement('button')
        button.setAttribute('data-trainer-id', trainerObj.id)
        button.innerHTML = "Add Pokemon"

        card.appendChild(button)
        
        // Add Event Listener to 'Add Pokemon' button.

        card.querySelector('button').addEventListener('click', function(e) {

            if (card.querySelector('ul').children.length <= 6) {
                const configObj = {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    },
                    body: JSON.stringify({ 
                        trainer_id: trainerObj.id 
                    })
                };
    
                return fetch('http://localhost:3000/pokemons', configObj)
                .then(resp => resp.json())
                .then(json => addPokemon(json))
       
                function addPokemon(json) {
                 
                    if (card.querySelector('ul').children.length < 6) {
                        let li = document.createElement('li')
                        li.innerHTML = `${json.nickname} (${json.species})`
        
                        const releaseButton = document.createElement('button')
                        releaseButton.innerHTML = "Release"
                        releaseButton.classList.add('release')
                        releaseButton.setAttribute('data-pokemon-id', json.id)
                        li.appendChild(releaseButton)
        
                        card.querySelector('ul').appendChild(li);

                        let pokemonLi = card.querySelector('li')

        
                    }
                    
                }
            } else {
                alert("You have more than six pokemon!")
            }
            
        });

        // The next block of code will list out the trainer's pokemons and add release buttons.
        

        const ul = document.createElement('ul')

        for (let pokemon of trainerObj.pokemons) {
            const li = document.createElement('li')
            li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

            const releaseButton = document.createElement('button')
            releaseButton.innerHTML = "Release"
            releaseButton.classList.add('release')
            releaseButton.setAttribute('data-pokemon-id', pokemon.id)
            li.appendChild(releaseButton)

            ul.appendChild(li)

            // Add Event Listener to 'Release' button.

            releaseButton.addEventListener('click', function(e) {
                
                let pokemonId = e.target.getAttribute('data-pokemon-id')

                configObj = {
                    method: "DELETE",
                    headers: {
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    }
                }

                fetch(`http://localhost:3000/pokemons/${pokemonId}`)
                .then(resp => resp.json())
                .then(json => removePokemon())

                function removePokemon() {
                    const pokemonLi = card.querySelector('[data-pokemon-id="' + pokemonId+ '"]').parentNode
                    console.log(pokemonLi)
                    pokemonLi.parentNode.removeChild(pokemonLi)
                }
            })
        }

        card.appendChild(ul)

    }

}