const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainNode = document.querySelector('main')

function fetchTrainers() {

    fetch(`${TRAINERS_URL}`)
    .then(resp => resp.json())
    .then(json => {
        for (const trainer of json) {
            createTrainerCards(trainer)
        }
    })

}

function createTrainerCards(trainerJSON) {
    const cardNode = document.createElement('div')
    cardNode.setAttribute('class', 'card')
    mainNode.appendChild(cardNode)
    const trainerNameNode = document.createElement('p')
    trainerNameNode.innerText = trainerJSON['name']
    cardNode.appendChild(trainerNameNode)
    const addPokemonNode = document.createElement('button')
    addPokemonNode.setAttribute('data-trainer-id', `${trainerJSON['id']}`)
    addPokemonNode.innerText = 'Add Pokemon'
    
    cardNode.appendChild(addPokemonNode)
    const pokemonParentNode = document.createElement('ul')
    addPokemonNode.addEventListener('click', (e) => {
        handleAddPokemonClick(e.target.attributes[0].value, pokemonParentNode)
    })
    cardNode.appendChild(pokemonParentNode)
    appendPokemon(pokemonParentNode, trainerJSON['pokemons'])
}

function appendPokemon(parentNode, pokemons) {
    for (const pokemon of pokemons) {
        const liNode = document.createElement('li')
        liNode.innerText = `${pokemon['nickname']} (${pokemon['species']})`
        const releaseButtonNode = document.createElement('button')
        releaseButtonNode.setAttribute('class', 'release')
        releaseButtonNode.setAttribute('data-pokemon-id', `${pokemon['id']}`)
        releaseButtonNode.innerText = 'Release'
        liNode.appendChild(releaseButtonNode)
        releaseButtonNode.addEventListener('click', (e) => {
            handleReleaseButtonClicked(e)
        })
        parentNode.appendChild(liNode)
    }
}

function handleAddPokemonClick(trainerId, pokemonParentNode) {
    const trainerURL = `${TRAINERS_URL}/${trainerId}`
    let trainer = {}
    fetch(trainerURL)
    .then(resp => resp.json())
    .then(json => {
        trainer = Object.assign(trainer, json)
        if (trainer['pokemons'].length < 6) {
            addPokemonToTrainer(trainer, pokemonParentNode)
        }
    })
}

function addPokemonToTrainer(trainer, parentNode) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'trainer-id': parseInt(trainer['id'])
        })
    }
    fetch(POKEMONS_URL, options)
    .then(resp => resp.json())
    .then(json => {
        appendNewPokemon(json, parentNode)
    })
}

function appendNewPokemon(pokemon, parentNode) {
    const liNode = document.createElement('li')
    liNode.innerText = `${pokemon['nickname']} (${pokemon['species']})`
    const releaseButtonNode = document.createElement('button')
    releaseButtonNode.setAttribute('class', 'release')
    releaseButtonNode.setAttribute('data-pokemon-id', `${pokemon['id']}`)
    releaseButtonNode.innerText = 'Release'
    liNode.appendChild(releaseButtonNode)
    releaseButtonNode.addEventListener('click', (e) => {
        handleReleaseButtonClicked(e)
    })
    parentNode.appendChild(liNode)
}

function handleReleaseButtonClicked(e) {
    const pokemonId = parseInt(e.target.attributes[1].value)
    const pokemonLiNode = e.target.parentNode
    options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'pokemon-id': pokemonId
        })
    }

    const deletePokemonURL = `${POKEMONS_URL}/${pokemonId}`
    fetch(deletePokemonURL, options)
    .then(resp => resp.json())
    .then(json => {
        if (json['message'] == 'Pokemon released') {
            pokemonLiNode.remove()
        }
    })
    

}




document.addEventListener('DOMContentLoaded', (e) => {

    fetchTrainers()

})