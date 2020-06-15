const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    //fetch and render trainers
    fetch("http://localhost:3000/trainers")
    .then(response => response.json())
    .then(json => renderTrainerCards(json))
    .catch(error => alert(error.message));
});

function renderTrainerCards(trainerObjects){
    //create a card for each trainer, and then add it to the trainerContainer
    const trainerContainer = getTrainerContainer();
    trainerObjects.forEach(trainerObject => {
        const trainerCard = createCardForTrainer(trainerObject);
        trainerContainer.appendChild(trainerCard);
    });
}

function getTrainerContainer(){
    let trainerContainer = document.querySelector("#trainer-container");
    if (trainerContainer == undefined) {
        trainerContainer = document.createElement("div");
        trainerContainer.id = "trainer-list";

        //append the new Ul to main
        const main = document.querySelector("main");
        main.appendChild(trainerContainer);
    }
    return trainerContainer;
}

function createCardForTrainer(trainerObject){
    //create div (card) for trainer:
    const trainerCard = document.createElement("div");
    trainerCard.setAttribute("data-id", trainerObject.id);
    trainerCard.id = `trainer-id-${trainerObject.id}`;

    //create a name paragraph for the trainer and append it to the card:
    const nameP = document.createElement("p");
    nameP.innerHTML = trainerObject.name;
    trainerCard.appendChild(nameP);

    //create a button with which to add a pokemon to the trainer's team, and append it to the card:
    const addPokemonBtn = createBtnSoTrainerCanAddPokemon(trainerObject);
    trainerCard.appendChild(addPokemonBtn);

    //create a Ul for the pokemon on this trainer's team and append it to the card:
    const pokemonUl = document.createElement("ul");
    trainerCard.appendChild(pokemonUl);

    //create an Li for each pokemon and append it to the pokemon Ul    
    trainerObject.pokemons.forEach(pokemon => {
        const pokemonLi = createLiForPokemon(pokemon);
        addPokemonLiToTrainerCard(trainerCard, pokemonLi);
    });

    return trainerCard;
}

function addPokemonLiToTrainerCard(trainerCard, pokemonLi){
    const pokemonUlForTrainer = trainerCard.querySelector("ul");
    pokemonUlForTrainer.appendChild(pokemonLi);
}

function createBtnSoTrainerCanAddPokemon(trainerObject){
    const addPokemonBtn = document.createElement("BUTTON");
    addPokemonBtn.innerHTML = "Add Pokemon";
    addPokemonBtn.setAttribute("data-trainer-id", trainerObject.id);
    //addPokemonBtn.id = `trainer-id-${trainerObject.id}`;
    addPokemonBtn.addEventListener("click", function(){
        const trainerCard = document.getElementById(`trainer-id-${trainerObject.id}`);
        const currentRosterLength = trainerCard.querySelectorAll("li").length;
        //const currentRosterLength = trainerObject.pokemons.length;
        if (currentRosterLength < 6){
            createAndAddPokemonToTrainer(trainerObject);  
        }else{
            alert("A trainer cannot have more than 6 pokemon on a team.");
        }      
    });
    return addPokemonBtn;
}

function createAndAddPokemonToTrainer(trainerObject){
    //first, fetch an unclaimed pokemon and update this pokemon with new trainer:
    // fetch(`http://localhost:3000/pokemon/unclaimed/first`)
    // .then(response => response.json())
    // .then(pokemonObject => addPokemonToTrainer(trainerObject, pokemonObject))
    // .catch(error => alert(error.message));

    //use faker to create a new pokemon
    let trainerData = {trainer_id: trainerObject.id};
    let configurationObject = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(trainerData)
    }
    fetch(`http://localhost:3000/pokemon`, configurationObject)
    .then(response => response.json())
    .then(pokemonObject => createAndAddPokemonLiToTrainerCard(trainerObject, pokemonObject))
    .catch(error => alert(error.message));
}

function createAndAddPokemonLiToTrainerCard(trainerObject, pokemonObject){            
    //for some reason, creating pokemon with trainer_id is not working, so:
    assignTrainerToPokemon(trainerObject, pokemonObject);
    //create li for pokemon, and add it to the trainer's card:
    const newLiForPokemon = createLiForPokemon(pokemonObject);
    const trainerCard = document.getElementById(`trainer-id-${trainerObject.id}`);
    const pokemonUl = trainerCard.querySelector("ul");
    pokemonUl.appendChild(newLiForPokemon);
}

function createLiForPokemon(pokemon){
    //create an Li for the pokemon:
    const pokemonLi = document.createElement("li");
    pokemonLi.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    pokemonLi.id = `pokemon-id-${pokemon.id}`;
    
    //create a release button for the pokemonLi:
    const releaseBtn = document.createElement("BUTTON");
    releaseBtn.class = "Release";
    releaseBtn.setAttribute('data-pokemon-id', pokemon.id);
    releaseBtn.innerHTML = "Release";
    
    //add an event listener to the release button
    releaseBtn.addEventListener("click", function(){
        removePokemon(pokemon);
    });

    //attach a release button to the pokemonLi:
    pokemonLi.appendChild(releaseBtn);

    return pokemonLi;
}

function removePokemon(pokemon){
    //const pokemonLi = document.querySelectorAll(`[data-pokemon-id] = '${pokemon.id}'`)[0];
    //remove li associated with pokemon:
    const pokemonLi = document.getElementById(`pokemon-id-${pokemon.id}`);
    if (pokemonLi == undefined){
        alert(`pokemon with id ${pokemon.id} does not have a trainer`);
    }else{    
        pokemonLi.remove();
        //update pokemon to reflect absence of trainer:
        removeTrainerFromPokemonWithId(pokemon.id);
    }
}

function removeTrainerFromPokemonWithId(id){
    return updatePokemonWithId(id, {trainer_id: 'nil'});
}

function assignTrainerToPokemon(trainerObject, pokemonObject){
    return updatePokemonWithId(pokemonObject.id, {trainer_id: trainerObject.id});
}

function createPokemonForTrainerWithId(trainerId){
    updateData = JSON.stringify({trainer_id: trainerId});
    let configurationObject = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: updateData
    };
    return fetch(`http://localhost:3000/pokemon/${id}`, configurationObject)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => alert(error.message));
}

function updatePokemonWithId(id, updateData){
    updateData = JSON.stringify(updateData);
    let configurationObject = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: updateData
    };
    return fetch(`http://localhost:3000/pokemon/${id}`, configurationObject)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => alert(error.message));
}

function fetchAllUnclaimedPokemon(){
    return fetch(`http://localhost:3000/pokemon/unclaimed`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => alert(error.message));
}

function fetchTrainers(){
    fetchCollection("trainers");
}

function fetchTrainerWithId(id){
    fetchRecord("trainers", id);
}

function fetchPokemon(){
    fetchCollection("pokemon");
}

function fetchPokemonWithId(id){
    fetchRecord("pokemon", id);
}

function fetchCollection(name){
    return fetch(`http://localhost:3000/${name}`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => alert(error.message));
}

function fetchRecord(collectionName, id){
    return fetch(`http://localhost:3000/${collectionName}/${id}`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => alert(error.message));
}