const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(all_trainers => {
        console.log(all_trainers)
        createAllTrainerCards(all_trainers);
        addReleaseButtonEvents();
        addPokemonButtonEvents();
    });
});

function addPokemonButtonEvents(){
    document.querySelectorAll('div.card > button').forEach(button => {
        button.addEventListener('click', addPokemon)
    });
}

function addPokemon(){
    console.log('adding')
    let trainer_id = this.getAttribute('data-trainer-id')

    let formData = {
        trainer_id: trainer_id
    }    
    
    let config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json'
        },
        body: JSON.stringify(formData)
    }

    fetch(POKEMONS_URL, config)
    .then(response => response.json())
    .then(object => {
        document.querySelector(`div.card[data_id="${object.trainer_id}"] ul`).appendChild(createPokemonListItem(object))
    })
    .catch(error => alert(error.message))
}

function releasePokemon(){
    
    let pokemonId = this.getAttribute('data_pokemon_id'); 

    let config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
    fetch(`${POKEMONS_URL}/${pokemonId}`, config)
    .then( response => {
        return response.json()
    })
    .then( object => {
        document.querySelector(`button.release[data_pokemon_id = "${object.id}"]`).parentNode.remove();
    })
    .catch( error => {
        console.log(error)
    });
}

function addReleaseButtonEvents(){
    document.querySelectorAll('button.release').forEach(button => {
        button.addEventListener('click', releasePokemon)
    });
}

function createAllTrainerCards(all_trainers){
    let trainers_container = document.querySelector('main')
    all_trainers.forEach(function(trainer){
        trainers_container.appendChild(createTrainerCard(trainer))
    });
}

function createTrainerCard(trainer){
    let new_card = document.createElement('div');
    new_card.className = 'card';
    new_card.setAttribute('data_id', trainer.id);
    new_card.appendChild(createElementWithInnerHTML('p', trainer.name));
    new_card.appendChild(createAddPokemonButton(trainer.id));
    new_card.appendChild(createPokemonList(trainer.pokemons))
    return new_card
}

function createElementWithInnerHTML(element_name, inner_html){
    let element = document.createElement(element_name);
    element.innerHTML = inner_html;
    return element;
}

function createAddPokemonButton(trainer_id){
    let element = document.createElement('button');
    element.setAttribute('data-trainer-id', trainer_id);
    element.innerHTML = 'Add Pokemon';
    return element
}

function createPokemonList(all_pokemon){
    let unordered_list = document.createElement('ul');
    all_pokemon.forEach( pokemon => {        
        unordered_list.appendChild(createPokemonListItem(pokemon))
    });
    return unordered_list;
}

function createPokemonListItem(pokemon){
    let list_item = document.createElement('li');
    list_item.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    list_item.appendChild(createPokemonReleaseButton(pokemon.id));
    return list_item
}

function createPokemonReleaseButton(pokemon_id){
    let element = document.createElement('button');
    element.className = 'release';
    element.setAttribute('data_pokemon_id', pokemon_id)
    element.innerHTML = 'Release';
    return element
}
