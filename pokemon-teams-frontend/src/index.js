const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const deletePoke = (pokeToDeleteId) => {
    const reqObj = {
        method: 'DELETE'
    }
    
    fetch(POKEMONS_URL + `/${pokeToDeleteId}`, reqObj)
        .then(resp => resp.json())
        .then(deletedMsg => {
            console.log(deletedMsg); 
        })
}

const releasePoke = (e) => {
    e.target.parentNode.remove();
    const pokeToDeleteId = e.target.dataset.id; 
    deletePoke(pokeToDeleteId);
}

const addReleasePokemonListeners = () => {
    const releaseBtns = document.querySelectorAll('.release');
    releaseBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => { 
            releasePoke(e); 
        })
    })
}

const renderNewPoke = (pokeObjdata) => {
    const trainerPokemonList = document.getElementById(`${pokeObjdata.attributes.trainer.id}`)
    const pokemonItem = document.createElement('li');
    pokemonItem.className = `${pokeObjdata.attributes.trainer.id}`
    pokemonItem.innerText = `${pokeObjdata.attributes.species} (${pokeObjdata.attributes.nickname})`; 
    const releaseBtn = document.createElement('button');
    releaseBtn.className = 'release';
    releaseBtn.innerText = 'Release';
    releaseBtn.dataset.id = pokeObjdata.id; 
    releaseBtn.addEventListener('click', (e) => { 
        releasePoke(e); 
    })
    pokemonItem.append(releaseBtn); 
    trainerPokemonList.append(pokemonItem); 
}

const addPokemon = (trainerCardId) => {
    const reqObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({trainer_id:trainerCardId})
    }
    
    fetch(POKEMONS_URL, reqObj)
        .then(resp => resp.json())
        .then(pokeObj => {
            renderNewPoke(pokeObj.data); 
        })
}

const addNewPokemonListeners = () => {
    const newPokemonBtns = document.querySelectorAll('.add-new-pokemon');
    newPokemonBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const trainerCardId = e.target.parentNode.dataset.id; 
            const trainerPokeArray = document.getElementsByClassName(`${trainerCardId}`)
            const pokeTeamSize = trainerPokeArray.length; 
            if (pokeTeamSize < 6){
                addPokemon(trainerCardId);
            }     
        })
    })
}

const addSiteListeners = () => {
    addNewPokemonListeners();
    addReleasePokemonListeners(); 
}

const renderPoke = (poke) => { 
    const newPoke = new Pokemon(poke);
    newPoke.render(); 
}

const renderPokes = (pokesObj) => {
    pokesObj.data.forEach((poke) => {
        renderPoke(poke); 
    })
    addSiteListeners(); 
}

const fetchPokemons = () => {
    fetch(POKEMONS_URL)
        .then(resp => resp.json())
        .then(pokesObj => {
            renderPokes(pokesObj); 
        })
}

const renderTrainer = (trainer) => {
    const newTrainer = new Trainer(trainer);
    newTrainer.render(); 
   
}

const renderTrainers = (trainersObj) => { 
    trainersObj.data.forEach((trainer) => {
        renderTrainer(trainer); 
    })
    fetchPokemons(); 
}

const fetchTrainers = () => {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainersObj => {
            renderTrainers(trainersObj)
        })
}

const main = () => {
    document.addEventListener('DOMContentLoaded', () => {
        fetchTrainers(); 
    })
}

main();