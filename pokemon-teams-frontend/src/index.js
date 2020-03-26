const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', function(){
    createTeams()
});

function createTeams() {
    let obj = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        } 
      }
    fetch(TRAINERS_URL, obj)
    .then(response => response.json())
    .then(object => buildTrainerCards(object))
    .catch(error => console.log(error.message))
};

function buildTrainerCards(object) {
    for (const obj in object) {
        let trainer = object[obj]

        let card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('data-id', trainer.id )
        let btn = document.createElement('button')
        btn.innerHTML = 'Add Pokemon'
        btn.setAttribute('data-trainer-id', trainer.id)
        btn.addEventListener('click', addPokemon)
        

        let p = document.createElement('p')
        p.innerHTML = trainer.name

        let ul = document.createElement('ul')

        fillTeam(trainer.pokemons, ul)
        card.appendChild(p)
        card.appendChild(btn)
        card.appendChild(ul)
        main.appendChild(card)
    }
}

function fillTeam(pokemons, ul) {
    for (obj in pokemons) {
        let pokemon = pokemons[obj]
        let li = document.createElement('li')
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

        let btn = document.createElement('button')
        btn.innerHTML = 'Release'
        btn.classList.add('release')
        btn.setAttribute('data-pokemon-id', pokemon.id)
        btn.addEventListener('click', releasePokemon)

        ul.appendChild(btn)
        ul.appendChild(li)
    }
};

function releasePokemon(event) {
    
    event.preventDefault
    let button = event.target
    let li = button.nextSibling
    let pokemonId = parseInt(button.getAttribute('data-pokemon-id'))

    let url = `${POKEMONS_URL}/${pokemonId}`
    let obj = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        } 
      }

    fetch(url, obj)
    .then(removePokemon(button, li))
    .catch(error => console.log(error.message))
};

function removePokemon(btn, li){
   li.remove()
   btn.remove()
};

function addPokemon(event){
    event.preventDefault
    let button = event.target
    let ul = button.parentElement.querySelector('ul')
    let lis = ul.querySelectorAll('li')

    if (lis.length < 6) {
        let trainerId = parseInt(button.getAttribute('data-trainer-id'))
        obj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainerId
            })
        }
    
        fetch(POKEMONS_URL, obj)
        .then(response => response.json())
        .then(function(pokemon){
            
            // let ul = document.querySelector('[data-id="'+ CSS.escape(pokemon.trainer_id)+ '"]').children[2]
            let li = document.createElement('li')
            li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    
            let btn = document.createElement('button')
            btn.innerHTML = 'Release'
            btn.classList.add('release')
            btn.setAttribute('data-pokemon-id', pokemon.id)
            btn.addEventListener('click', releasePokemon)
    
            ul.appendChild(btn)
            ul.appendChild(li)
        })
        .catch(error => console.log(error))
    } else {
        alert('This team already has 6 Pokemon!')
    }
};