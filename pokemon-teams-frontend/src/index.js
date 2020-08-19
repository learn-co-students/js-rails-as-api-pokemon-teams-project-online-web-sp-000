const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', () => {
    pageSetup();
})

function pageSetup() {
    fetchTrainers();
}


function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainerData => processTrainers(trainerData))
}


function processTrainers(trainerData){
        trainerData.forEach( trainer => showTrainer(trainer))
        trainerData.forEach( trainer => getParty(trainer.id))
}

function showTrainer(trainer){

    let trainerList = document.querySelector('.trainers')
    let newDiv = document.createElement('div')

    let card = document.createElement('div')
    card.className = "card"
    card.trainer = trainer.id


    let name = document.createElement('p')
    name.innerHTML = trainer.name
    let btn = document.createElement('button')
    btn["trainer-id"] = trainer.id
    btn.innerHTML = "Add Button"
    btn.addEventListener('click', addPokemon)
    let list = document.createElement("ul")
    list.id = trainer.id


    card.append(name, btn, list)

    newDiv.append(card)

    trainerList.append(newDiv)
    

}

function getParty(trainerId){
    fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then(res => res.json())
    .then(party => processParty(party))
}

function processParty(partyData) {
    partyData.forEach(pokemon => showPokemon(pokemon))
}

function showPokemon(pokemon){
    // console.log(pokemon)
    let trainer_id = pokemon.trainer_id
    let pokemonList = document.getElementById(`${trainer_id}`)
    let pokemonItem = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`


    pokemonList.innerHTML += (pokemonItem)
    let releaseBtns = document.querySelectorAll(".release")
    // releaseBtn.addEventListener('click', removePokemon)
    releaseBtns.forEach(element => 
        element.addEventListener('click', removePokemon)
    );
}

function addPokemon(event) {
    let payload = event.target.parentElement.trainer
    if (event.target.parentElement.querySelectorAll('li').length < 6) {    
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(resp => resp.json())
        .then(newPokemon => showPokemon(newPokemon)
        )
    } else {
        alert("You can't have more than six pokemon!!!")
    }
}

function removePokemon(event) {
    //* REMOVE FROM DATABASE
    let payload = event.target.parentElement
    let pokeId = event.target.dataset.pokemonId
    
    fetch(`${POKEMONS_URL}/${pokeId}` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // ,'Access-Control-Allow-Methods': "DELETE"
        }
    })
    payload.remove()
}