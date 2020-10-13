const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')
// add pokemon
// release pokemon

document.addEventListener('DOMContentLoaded', ()=>{
    allTrainers();
})

function allTrainers(){
    fetch(TRAINERS_URL)
    .then(resp=>resp.json())
    .then(trainers =>{
        for (const trainer of trainers){
            const newDiv = document.createElement('div');
            newDiv.className = 'card';
            newDiv.setAttribute('data-id', trainer.id);
            newDiv.appendChild(addP(trainer));
            newDiv.appendChild(addButton(trainer));
            newDiv.appendChild(document.createElement('ul'));
            main.appendChild(newDiv);
            trainer.pokemons.forEach(pokemon => loadPokemon(pokemon));
        }
    })
}

function addP(obj){
    const newP = document.createElement('p');
    newP.innerText = obj.name;
    return newP
}

function addButton(obj){
    const addButton = document.createElement('button');
    addButton.innerText = 'Add Pokemon';
    addButton.setAttribute('data-trainer-id', obj.id);
    addButton.addEventListener('click', e=>{
        // e.preventDefault();
        fetch(`${POKEMONS_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'trainer_id': obj.id
            })
        }).then(resp => resp.json()).then(json=> {
            if (json.message){
                alert(json.message)
            }else{
                loadPokemon(json)
            }
        })
    });
    return addButton;
}

function loadPokemon(pokemon){
    const ul = document.querySelector(`div[data-id='${pokemon.trainer_id}']`).lastChild
    const newLi = document.createElement('li');
    newLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    
    const releaseButton = document.createElement('button');
    releaseButton.className = 'release';
    releaseButton.innerText = 'Release';
    releaseButton.setAttribute('data-pokemon-id', pokemon.id);
    releaseButton.addEventListener('click', e=>{
        fetch(`${POKEMONS_URL}/${pokemon.id}`,{
            method: 'DELETE'
        }).then(resp => resp.json()).then(json => {
            removePokemon(json)
        })
    });
    newLi.appendChild(releaseButton);
    ul.appendChild(newLi);
}

function removePokemon(pokemon){
    document.querySelector(`button[data-pokemon-id='${pokemon.id}']`).parentElement.remove()
}