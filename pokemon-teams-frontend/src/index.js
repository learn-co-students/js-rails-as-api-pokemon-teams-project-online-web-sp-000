const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const DELETE_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')
let newPokemon
let itemToRemove
let deleteConfirmation
let referencedCard = ""
let unorderedList
const mainCard = document.getElementsByClassName("card")

function dataFound() {
  fetch(TRAINERS_URL).then(stepOne).then(stepTwo)};

function stepOne(response) {
  return response.json();
};

function stepTwo(json) {
  iterate(json["data"])
};



function iterate(fetchedData) {
  for(let object of fetchedData) {
    
    let newCard = document.createElement("div")
    newCard.className = "card"
    newCard.setAttribute("data-id", `${object["id"]}`)
    main.appendChild(newCard)
    
    let trainerNameSpace = document.createElement("p")
    let trainerName = object["attributes"]["name"]
    trainerNameSpace.innerText = trainerName
    newCard.appendChild(trainerNameSpace)
    
    let addPokemonButton = document.createElement("button")
    addPokemonButton.setAttribute("data-trainer-id", `${object["id"]}`)
    addPokemonButton.innerText = "Add Pokemon"
    addPokemonButton.addEventListener("click", function() {createPokemon(object["id"])})
    
    newCard.appendChild(addPokemonButton)
    
     unorderedList = document.createElement("ul")
    
    for(let critter of object["attributes"]["pokemons"]) {
      createNewListing(critter, unorderedList)
      
    } 
    newCard.appendChild(unorderedList)
  }
}


function createPokemon(id) {
 
  referencedCard = document.querySelectorAll(`[data-id = "${id}"]`)[0].querySelector("ul")

  if (referencedCard.childElementCount > 5){
    
    console.log("you're full!")
  } else {
    let idData = {
      "trainer_id": id
    };
    
    let creationObject  = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(idData)
    }
    
    fetch(POKEMONS_URL, creationObject).then(function(response) {
      return response.json();
    })
    .then(function(object) {
      newPokemon = object["data"]
      addPokemon(newPokemon, referencedCard)
    }); 
  }
}

function addPokemon(newPokemon, referencedCard) {
  let newCritter = newPokemon["attributes"]

   createNewListing(newCritter, referencedCard)
}
 
function createNewListing(critter, referencedCard) {
  let pokemonId = `${critter["id"]}`
  let pokemonNickName = `${critter["nickname"]}`
  let pokemonSpecies = `${critter["species"]}`
  let newListing = document.createElement('li')
  newListing.innerText = `${pokemonNickName} (${pokemonSpecies})`
 
  let deleteCritterButton = document.createElement("button")
  
      deleteCritterButton.className = "release"
      deleteCritterButton.setAttribute("data-pokemon-id", `${critter["id"]}`)

      deleteCritterButton.innerText = "Delete Pokemon"
      deleteCritterButton.addEventListener("click", function() {destroyPokemon(critter["id"])})
    
      newListing.appendChild(deleteCritterButton)
   return   referencedCard.appendChild(newListing)
}

function destroyPokemon(id) {
  
  let idData = {
    "id": id
  };
  
  let deletionObject  = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(idData)
  }
  
  fetch(`${POKEMONS_URL}/${id}`, deletionObject).then(function(response) {
    deleteConfirmation = response
    if (response["ok"] === true) {
      console.log("success!")
      itemToRemove = document.querySelectorAll(`[data-pokemon-id="${id}"]`);
      let target = itemToRemove[0].parentElement
      let parentTarget = target.parentElement
      parentTarget.removeChild(target)

  } else {
    console.log("failed!")
  }

 
})
}

dataFound()