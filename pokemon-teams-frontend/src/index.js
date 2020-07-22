const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    getAllTrainersAndPokemons()
})

function getAllTrainersAndPokemons() {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    return fetch(TRAINERS_URL, requestConfigs).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.data.forEach (object => createTrainerCard(object))
            
    })
}

function createTrainerCard(obj) {
    let cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    let addPkmBtn = document.createElement('button')
    let ulElem = document.createElement('ul')
    let para = document.createElement('p')
    let mainBody = document.querySelector('main')
    
    cardDiv.setAttribute("data-id", obj.id)
    para.textContent = obj.attributes.name
    addPkmBtn.textContent = "Add Pokemon"
    addPkmBtn.setAttribute('data-trainer-id', obj.id)
    addPkmBtn.addEventListener('click', event => {
        addNewPokemon(event)
    })
    cardDiv.appendChild(para)
    cardDiv.appendChild(addPkmBtn)
    cardDiv.appendChild(ulElem)

    let pokemons = obj.relationships.pokemons.data

    for (i = 0; i < pokemons.length; i++) {
        
        getPokemonFromApi(pokemons[i], cardDiv)
        mainBody.appendChild(cardDiv)

    }
    
    
}

function getPokemonFromApi(pokemon, cardDiv) {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    return fetch(`${POKEMONS_URL}/${pokemon.id}`, requestConfigs).then(function (response) {
        return response.json();
    }).then(function (json) {
        cardDiv.appendChild(addPokemonToList(json.data))

    })
}


function addPokemonToList(pokemon) {
    let liElem = document.createElement('li')
    let releasePkmBtn = document.createElement('button')
    releasePkmBtn.className = "release"
    releasePkmBtn.textContent = "Release"
    releasePkmBtn.setAttribute('data-pokemon-id', pokemon.id)
    releasePkmBtn.addEventListener('click', event => {
        removePokemon(event)
    })
    liElem.textContent = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`
    liElem.appendChild(releasePkmBtn)
    return liElem

}

function addNewPokemon(event) {
    const requestConfigs = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(
            {   
                "trainer_id": event.target.getAttribute('data-trainer-id')
            }
        )
    }

    return fetch(POKEMONS_URL, requestConfigs).then(function (response) {
        return response.json();
    }).then(function(json) {
        if (json.status === 'error') {
            console.log(json.message)
        }
        else
        {let trainerId = json.data.relationships.trainer.data.id
        let pokemonLi = addPokemonToList(json.data)
        
        findTrainerCardAndAddPokemon(trainerId, pokemonLi)}
    })
}

function findTrainerCardAndAddPokemon(trainerId, pokemonLi) {
    let allCards = document.querySelectorAll('.card')
    allCards.forEach(function(card){
        if (card.getAttribute('data-id') === trainerId) {
            card.appendChild(pokemonLi)
        }
    })
    
}

function removePokemon(event) {
    const requestConfigs = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${POKEMONS_URL}/${event.target.getAttribute('data-pokemon-id')}`, requestConfigs).then(function(response){
        return response.json();
    }).then(function(json){

        event.target.parentNode.parentNode.removeChild(event.target.parentNode)
    })
}