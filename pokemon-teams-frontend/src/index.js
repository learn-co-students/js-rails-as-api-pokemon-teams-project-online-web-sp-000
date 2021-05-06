const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
        .then(allowAddPokemon)
        .then(allowRemovePokemon)
})

function allowAddPokemon() {

    function addPokemon(trainerID) {

        return fetch(POKEMONS_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                trainer_id: trainerID
            })
        }).then(e => e.json())
    }



    let addPokeButtons = document.body.querySelectorAll('button.add')
    addPokeButtons.forEach(btn => {
        let trainerID = btn.getAttribute('data-trainer-id')
        let ul = btn.nextElementSibling
        btn.addEventListener('click', () => {
            addPokemon(trainerID)
                .then(e => renderLineFor(ul, e))
                .then(allowRemovePokemon)
                .catch(e => renderError(e))
        })
    })
}

function allowRemovePokemon() {

    function deletePokemon(id) {
        return fetch(`${POKEMONS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
    }

    let removePokeButtons = document.body.querySelectorAll('button.release')
    removePokeButtons.forEach(btn => {
        let pokeID = btn.getAttribute('data-pokemon-id')

        btn.addEventListener('click', () => {
            deletePokemon(pokeID)
                .then(e => btn.parentElement.remove())
        })
    })
}

function fetchTrainers() {

    const conf = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }

    return fetch(TRAINERS_URL, conf)
        .then(e => e.json())
        .then(e => renderTrainers(e))
        .catch(e => renderError(e))
}

function renderTrainers(trainers) {
    trainers.forEach(t => renderTrainer(t))
}

function renderTrainer(trainer) {
    let main = document.getElementById('main')

    let newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.setAttribute('data-id', trainer.id)

    let p = document.createElement('p')
    p.textContent = trainer.name

    let addPokemonBtn = document.createElement('button')
    addPokemonBtn.textContent = 'Add Pokemon'
    addPokemonBtn.classList.add('add')
    addPokemonBtn.setAttribute('data-trainer-id', trainer.id)

    let ul = document.createElement('ul')
    trainer.pokemon.forEach(p => renderLineFor(ul, p))

    newCard.append(p, addPokemonBtn, ul)
    main.append(newCard)
}

function renderLineFor(ul, p) {
    let li = document.createElement('li')
    li.innerHTML = `${p.nickname} (${p.species}) <button class="release" data-pokemon-id="${p.id}">Release</button>`
    ul.appendChild(li)
}

function renderError(msg) {
console.log(msg)
}