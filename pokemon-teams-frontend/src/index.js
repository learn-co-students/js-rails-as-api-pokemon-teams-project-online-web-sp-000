const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

// data
let trainers;
fetch(TRAINERS_URL).then(response =>
    response.json())
    .then(object => trainers = object)
let pokemons;
fetch(POKEMONS_URL).then(response =>
    response.json())
    .then(object => pokemons = object)

// creators for elements
function trainerDiv(trainer) {
    const newDiv = document.createElement('div')
    newDiv.setAttribute('id', `data-id-${trainer.id}`)
    newDiv.setAttribute('class', 'card')
    let pName = document.createElement('p')
    pName.innerHTML = trainer.name
    newDiv.appendChild(pName)
    return newDiv
}



const ul = document.createElement('ul')

// element creator functions
function createElement(element, content) {
    let el = document.createElement(element)
    el.innerHTML = content
    return el
}
function trainerButton(trainer) {
    let bt = createElement('button', 'Add Pokemon')
    bt.setAttribute('data-trainer-id', `${trainer.id}`)
    addPokeToTrainer(bt, trainer)
    return bt;
}
function createPokeLi(pokemon) {
    let btn = document.createElement('button')
    let li = document.createElement('li')
    btn.setAttribute('class', 'release')
    btn.setAttribute('data-pokemon-id', `${pokemon.id}`)
    btn.innerHTML = 'Release'
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    li.appendChild(btn)
    btn.addEventListener('click', function(e) {
        deletePokemon(pokemon)
        // let trainer = trainers[pokemon.trainer_id - 1]
        // trainer.pokemons.splice(trainer.pokemons.indexOf(pokemon), 1);
        li.remove();
    })
    return li
}
function addTrainers(trainers) {
    for (const trainer of trainers) {
        const trn = trainerDiv(trainer)
        trn.appendChild(trainerButton(trainer))
        const tul = document.createElement('ul')
        for (const pokemon of trainer.pokemons){
            tul.appendChild(createPokeLi(pokemon))
        }
        trn.appendChild(tul)
        main.appendChild(trn)
    }
}
function deletePokemon(pokemon) {
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"trainer_id": pokemon.trainer_id })
    })
    .catch(function(error) {
        alert(error.message);
    });
}
function addPokeToTrainer(element, trainer) {
    element.addEventListener('click', function(e) {
        if (trainer.pokemons.length < 6) {
            fetch('http://localhost:3000/pokemons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"trainer_id": trainer.id })
            })
            .then(response => response.json())
            .then(pokemon => {
                trainer.pokemons.push(pokemon)
                element.nextElementSibling.appendChild(createPokeLi(pokemon));
            })
            .catch(function(error) {
                alert(error.message);
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', function() {
    fetch(TRAINERS_URL).then(response =>
        response.json())
        .then(object => addTrainers(object));
});
