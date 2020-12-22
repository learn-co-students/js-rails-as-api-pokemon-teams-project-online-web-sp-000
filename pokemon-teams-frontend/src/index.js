const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', (e) => {
    fetchTrainers();
   
});

function fetchTrainers(){
    return fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => listTrainers(json));
}

function fetchPokemon(){
    return fetch(POKEMONS_URL)
        .then(resp => resp.json())
        .then(json => listPokemon(json));
}

function listTrainers(json){
    json.forEach(trainer => {
        let div = document.createElement("div")
        div.classList.add("card")
        div.setAttribute('data-id', `${trainer.id}`)
        main.appendChild(div)
        let p = document.createElement("p")
        p.innerText = trainer.name
        div.appendChild(p)
        let button = document.createElement("button")
        button.setAttribute('data-trainer-id', `${trainer.id}`)
        button.innerText = "Add Pokemon"
        button.addEventListener('click', (e)=> addPokemon(e) )
        div.appendChild(button)
        let ul = document.createElement("ul")
        div.appendChild(ul)
    })
    fetchPokemon()
}

function listPokemon(json){
    json.forEach(pokemon =>{
        if (pokemon.trainer_id){
            appendTrainer(pokemon)
        }
    })
}

// function addPokemon(e){
//     let trainerId = e.target.attributes["data-trainer-id"].value; //get the trainers id
//     let list = e.target.nextSibling
//     if (list.children.length < 6 ){
//         getPokemon(trainerId)
//     }else{
//         alert('You already have 6 pokemon!');
//     };
// }

function addPokemon(e){
    let trainerId = e.target.attributes["data-trainer-id"].value; //get the trainers id
    let thisTrainer = {}
    thisTrainer = getTrainer(trainerId)
    // console.log(thisTrainer)
    if (thisTrainer.pokemon.length < 6 ){
        getPokemon(trainerId)
    }else{
        alert('You already have 6 pokemon!');
    };
}

function getTrainer(trainerId){
    return fetch(`${TRAINERS_URL}/${trainerId}`) // fetch the trainers ID
        .then(resp => resp.json()) // converth the response to JSON
        .then(json => {
            thisTrainer = json
            return thisTrainer
            console.log(thisTrainer)
            // return thisTrainer
        });     
}

function getPokemon(id){
    let formData= {
        trainerId: id,
    }

    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };
    
    return fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(json => appendTrainer(json))
        .catch(function(error){
            alert("NOOOOOO!");
            console.log(error.message);
        })
}

function appendTrainer(pokemon){
    let trainerDiv = document.querySelector(`body > main > div:nth-child(${pokemon.trainer_id})`);
            let ul = trainerDiv.children[2];
            let li = document.createElement("li");
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            let liButton = document.createElement("button");
            liButton.classList.add("release");
            liButton.setAttribute('data-pokemon-id', `${pokemon.id}`);
            liButton.innerText = "Release"
            liButton.addEventListener('click', (e) => { releasePoketMonsters(e)}) 
            li.appendChild(liButton);
            ul.appendChild(li);
}
// 
function releasePoketMonsters(e){
    let targetLi = e.target.parentElement
    let id = e.target.attributes['data-pokemon-id'].value
    targetLi.remove()
    let formData= {
        pokemonId: id,
    }

    let configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    return fetch(`${POKEMONS_URL}/${id}`, configObj)
        .then(resp => resp.json())
        .then(json => {
            alert(`${json.nickname} the ${json.species} has now passed on to anther realm.`)
        })
        .catch(function(error){
            alert("NOOOOOO!");
            console.log(error.message);
        })
}