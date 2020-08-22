const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainerObject => {console.log(trainerObject); trainer_card(trainerObject)})

function trainer_card(trainers) {
    let main = document.querySelector('main')

    for (trainer of trainers) {
        let div = document.createElement('div')
        div.setAttribute('class', 'card')
        div.setAttribute('data-id', `${trainer.id}`)
        main.appendChild(div)
      
        let addButton = document.createElement('button')
        addButton.setAttribute('data-trainer-id', `${trainer.id}`)
        addButton.innerText = 'Add Pokemon'
        div.appendChild(addButton)
        let ul = document.createElement('ul')
        for (pokemon of trainer.pokemons) {
            trainerAddCard(pokemon)
            releaseButton.addEventListener('click', function(e) {
                pokemonDeleteCard(e.target.getAttribute('data-pokemon-id'))
            })
            function pokemonDeleteCard(id) {
                fetch(POKEMONS_URL + '/' + id, {
                    method: 'DELETE'})
                    .then(response => response.json())
                    .then(object => console.log(object))
            }
        }
        div.appendChild(ul)
        
        addButton.addEventListener('click', function(e) {
            console.log(e.target.getAttribute('data-trainer-id'))
            fetchPostRequest(e.target.getAttribute('data-trainer-id'))
        })
        function fetchPostRequest(id) {
            let formData = {
                trainer_id: `${id}`
            }
            let configObj = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            };
            fetch(POKEMONS_URL, configObj)
            .then(response => response.json())
            .then(pokemonObject => {console.log(pokemonObject); trainerAddCard(pokemonObject)})
        }
        function trainerAddCard(pokemonObject) {
            let li = document.createElement('li')
            li.innerText = `${pokemonObject.nickname} (${pokemonObject.species})`
            ul.appendChild(li)
            releaseButton = document.createElement('button')
            releaseButton.setAttribute('class', 'release')
            releaseButton.setAttribute('data-pokemon-id', `${pokemonObject.id}`)
            releaseButton.innerText = 'Release'
            li.appendChild(releaseButton)
        }
    } 
}