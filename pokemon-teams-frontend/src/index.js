const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//work here in javascript next to try to get the trainers on the page in the right areas and then their current pokemons on the page in the right area. 

document.addEventListener("DOMContentLoaded", () => {
    getTrainers();
})

function getTrainers() {
//gives you trainers with their pokemons
fetch("http://localhost:3000/trainers")
.then((resp) => resp.json())
.then(object => loadTrainerTeam(object))
}

function getPokemons() { 
//function for later that grabs new pokemons
}

function loadTrainerTeam(object) { 
    console.log(object.data[0].attributes.name) //this shows the trainer name in the browser
let main = document.getElementsByTagName("main")[0]
object.data.forEach(element => { 
    console.log(element.id)
    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    let p = document.createElement("p")
    p.innerText = element.attributes.name
    cardDiv.appendChild(p)
    let createButton = document.createElement("button")
    createButton.innerText = "Add Pokemon"
    createButton.setAttribute("data-trainer-id", element.id)
    createButton.addEventListener("click", (event) => { 
        addPokemon(event);
    })
    cardDiv.appendChild(createButton)
    let ul = document.createElement("ul")
    element.attributes.pokemons.forEach(pokemon => {
        let li = document.createElement("li")
        let releaseButton = document.createElement("button")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        releaseButton.innerText = "Release"
        releaseButton.className = "release"
        releaseButton.setAttribute("data-pokemon-id", pokemon.id)
        releaseButton.addEventListener("click", (event) => {
            releasePokemon(event);
        })
        ul.appendChild(li)
        li.appendChild(releaseButton)
        cardDiv.appendChild(ul)
        
    })
    main.appendChild(cardDiv)
});
}

function addPokemon(event) { 
    let trainerId = event.target.attributes["data-trainer-id"].value //gives id for trainer you clicked "Add Pokemon" for. 
    let trainerPokemonCount = event.path[1].childNodes[2].childElementCount //gives the number of pokemon that the trainer currently has. 
    if (trainerPokemonCount < 6) { 
        postPokemon(trainerId);

    }
}
//validation check to see how many pokemon the trainer already has in their list. 
//find the list on the page. maybe finding the ul and counting how many lis it has.
//grabbing trainer id from previous method and making sure it gets in to here. 
//make variable called trainer id and get it from the event's target dataset, set it to event's target which was the button. 
//if trainer has less than 6 lis 
//send the post method and in the body of the post method we want to have our trainer id provided. 
//after that we can fetch pokemon again which updates the list items. 
    // post("http://localhost:3000/pokemons")
    // .then((resp) => resp.json())
    // .then(object => loadTrainerTeam(object))


function postPokemon(trainerId) { 
    fetch('http://localhost:3000/pokemons', {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({trainerId}) //creates params hash
})
.then(response => response.json())
.then(json => putPokemonOnDom(json)) //extract this json repsonse and put it on the dom so the dom gets the added pokemons immediately. 

}

function putPokemonOnDom(json) { 
    let species = json.data.attributes.species
    let nickname = json.data.attributes.nickname
    let trainerId = json.data.attributes.trainer_id
    let queriedElement = document.querySelector("[data-trainer-id=" + CSS.escape(trainerId) + "]");
    let li = document.createElement("li")
    let releaseButton = document.createElement("button")
    releaseButton.className = "release"
    releaseButton.innerText = "Release"
    li.innerText = `${nickname} (${species})`
    li.appendChild(releaseButton)
    queriedElement.parentElement.childNodes[2].appendChild(li)

//     var name = "hello, world!";
// document.querySelector("[data-name=" + name + "]");

    //createButton.setAttribute("data-trainer-id", element.id)

}


function releasePokemon(event) {
    let pokemonId = event.target.attributes["data-pokemon-id"].value;
    fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
        method: 'DELETE', 
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({"id": `${pokemonId}`, "type": "pokemon"})
    })
    .then(res => res.json()) // or res.json()
    .then(json => json)
    .then(event.target.parentElement.remove())
}