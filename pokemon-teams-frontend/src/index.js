const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')

fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(putTrainersOnPage)

fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(putTrainersOnPage)

function putTrainersOnPage(trainers){
    trainers.forEach(trainer => {
        let pokString = ""

        mainDiv.innerHTML += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>${pokString}</ul>
    </div>
    `
    })

mainDiv.addEventListener('click', e => {
    if (e.target.dataset.trainerId !== undefined) {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: e.target.dataset.trainerId
            })
        })
            .then(res => res.json())
            .then(addPokemon)
    }
    if (e.target.dataset.pokemonId !== undefined){
        e.target.parentElement.remove()
        fetch(POKEMONS_URL + '/' + e.target.dataset.pokemonId, {method : 'DELETE'})
    }
})

function addPokemon(pokemon){
    mainDiv.children[pokemon.trainer_id-1].lastElementChild.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}
}
