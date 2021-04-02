const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const getTrainers = () => {
    return fetch(TRAINERS_URL)
    .then(res => res.json())
}

const addPokemon = (trainerId) => {
    return fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'trainer_id': trainerId
        })
    })
    .then(res => res.json())
}

const releasePokemon = (pokemonId) => {
    return fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE",
    })
    .then(res => res.json())
}

let template = document.querySelector('main')

getTrainers()
    .then(json => {
        json.forEach(trainer => {
            let trainerCard = document.createElement('div')
            trainerCard.setAttribute('class', 'card')
            trainerCard.dataset.id = trainer.id

            trainerCard.innerHTML = renderCard(trainer)
            trainerCard.addEventListener('click', pressButton)

            template.append(trainerCard)

        })
    })


function renderCard(trainer) {
    return `
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
            ${trainer.pokemons.map( pokemon => {
                return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
            }).join('')}
        </ul>
        `
}

function pressButton(event) {
    if(event.target.tagName === "BUTTON") {
        switch(event.target.innerText){
            case 'Add Pokemon':
                addPokemon(parseInt(event.target.dataset.trainerId))
                    .then(pokemon => {
                        if(!pokemon.error){
                            let trainerCard = document.querySelector(`div[data-id='${pokemon["trainer_id"]}']`)
                            let pokemonDex = trainerCard.querySelector('ul')
                            pokemonDex.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
                    }
                })
            break;
            case 'Release':
                let pokemonId = parseInt(event.target.dataset.pokemonId)
                event.target.parentNode.remove()
                releasePokemon(pokemonId)
            break;
        }
    }
}