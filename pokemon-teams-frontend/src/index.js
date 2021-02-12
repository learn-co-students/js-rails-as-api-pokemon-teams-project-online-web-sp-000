const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function displayCards() {
    fetch(TRAINERS_URL).
    then( function(response) { return response.json() }).
    then( function(object) {  
        object.data.forEach( trainerObject => renderOneTrainer(trainerObject) )

    });


};

function renderOneTrainer(trainerObject) {
    const pokemonLisString = makePokemonLis(trainerObject.attributes.pokemons);
    const mainElement = document.getElementsByTagName("main")[0];
    const cardDivElement = document.createElement("div");
    cardDivElement.className = "card"
    cardDivElement.setAttribute("data-id", trainerObject.id);
    cardDivElement.innerHTML = `
    <p>${trainerObject.attributes.name}</p>
    <button class="add-pokemon-button" data-trainer-id="${trainerObject.id}">Add Pokemon</button>
    <ul>
    ${pokemonLisString}
    </ul>
    `
    // console.log(trainerObject)
    mainElement.appendChild(cardDivElement);
    const addButton = cardDivElement.getElementsByClassName("add-pokemon-button")[0];
    // console.log(addButton);
    addButton.addEventListener( "click", (event) => createPokemon(event));
    const deleteButtons = cardDivElement.querySelectorAll("button.release");
    // console.log(deleteButtons[0]);
    // const testHTMLCollection = cardDivElement.getElementsByClass("release");
    // testHTMLCollection.forEach (
    //  function(currentValue, currentIndex, button) {
    //      console.log(typeof button)
    //      console.log(button)

    //     // button.addEventListener("click", function(event) { deletePokemon(event) } );
    // })
    for (const button of deleteButtons) {
        button.addEventListener("click", function(event) { deletePokemon(event.target.getAttribute("data-pokemon-id")) } );
    }
};

function makePokemonLis(array) {
    let lisArray = [];
    for ( const pokemon of array) {
        const string = `
        <li>${pokemon.nickname} (${pokemon.species} ) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
        `;
        lisArray.push(string);
    };
    let lisString = lisArray.join(" ");
    return lisString
}

// testAddButton = THEPARENTNODE.document.getElementsByClassName("add-pokemon-button");
// testAddButton.addEventListener( "click", (event) => addPokemon(event));
//note: since u want to pass argument, u can't just give addPokemon, u have to call addPokemon inside a callback

displayCards()

function createPokemon(event) { 
    const trainer_id = parseInt(event.target.getAttribute("data-trainer-id"));

    //warning: havent added a 6 pokemon-max check
    // console.log(event.target);
    // console.log( event.target.getAttribute("data-trainer-id"));
    let data = {
        trainer_id: trainer_id,
        linda: "hicanhayeucuakem"
    }
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data)

    };

    fetch(POKEMONS_URL, configObject).
    then( function(response) { return response.json() }).
    then( function(object) {  displayOneNewPokemon(object.data)
     }).
    catch( function(error) { console.log( error.message)  })




};

function enforcePokemonLimit(trainer_id, limit, button) {
    // return xyz.. do not enter new line. it will return and ignore the rest!!! lol
    return fetch(`${TRAINERS_URL}/${trainer_id}`).
    then( function(response) { return response.json() }).
    then( function(object) { 
        //return somehow doesnt work. idk why
        if (object.data.attributes.pokemons.length >= limit) {
            //since this is called AFTER a pokemon is added, we disable once we hit 6. not after.
            button.disabled = true;
        }
 } );


}

function displayOneNewPokemon(pokemon) {
    //find trainer id, find div, find ul, add li
    // console.log(pokemon)
    const cardDivElement = document.querySelector(`div.card[data-id="${pokemon.attributes.trainer_id}"]`)
    const ulElement = cardDivElement.getElementsByTagName("ul")[0];
    const newLi = document.createElement("li");
    newLi.innerHTML = `
    ${pokemon.attributes.nickname} (${pokemon.attributes.species} ) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
    `
    ulElement.appendChild(newLi);
    const addButton = cardDivElement.getElementsByClassName("add-pokemon-button")[0];
    enforcePokemonLimit(pokemon.attributes.trainer_id, 6, addButton);
    


}


function deletePokemon(pokemonID) {
    let data = {
        pokemon_id: pokemonID,
    }
    let configObject = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data)
    };

    fetch(`${POKEMONS_URL}/${pokemonID}`, configObject).
    then( function(response) { return response.json() }).
    then( function(object) {      
        const liElement = document.querySelector(`button.release[data-pokemon-id="${pokemonID}"]`).parentNode;
        liElement.remove();
        //warning: even tho we dulicated before deleting, the object has no id. so dont rely on the returned object for id 
        //we just put it in here so that it will only run if delete in api database was successful
     }).
    catch( function(error) { console.log( error.message)  })

};