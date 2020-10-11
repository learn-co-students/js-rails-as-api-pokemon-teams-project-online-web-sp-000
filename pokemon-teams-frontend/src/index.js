const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const main = document.querySelector("main")

document.addEventListener('DOMContentLoaded', () => loadTrainers())

function loadTrainers(){

    console.log('@@LoadTrainers')
    fetch(TRAINERS_URL)

        .then(function(response) {
            return response.json();
        })        
        .then(json => {
            json.forEach(trainer => renderTrainer(trainer))        
        })

}

const renderTrainer =  (trainerHash) => {   
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")

    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainerHash.id)
    p.innerText = trainerHash.name
    button.setAttribute("data-trainer-id", trainerHash.id)
    button.innerText = "Add Pokemon"
    button.addEventListener('click', createPokemon)

    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    main.appendChild(div)

    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
}


function renderPokemon(pokemon){
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerText = "Release"
    button.addEventListener('click', deletePokemon)

    li.appendChild(button)
    ul.appendChild(li)
}


const createPokemon = (e) => {

    e.preventDefault()

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }

    fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(json => {
            if(json.message){  
                alert(json.message)
            } else {
                renderPokemon(json)
            }
        })

}


const deletePokemon = (e) => {

    e.preventDefault()

    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`{POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
    e.target.parentElement.remove()

}




// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log('DOM fully loaded and parsed');

//     const main = document.querySelector('main');

//     fetch(TRAINERS_URL)
//     .then(function(response) {
//         return response.json();
//       })
//       .then(function(trainers){
//         console.log('@@Hello', trainers)
//         for (trainer of trainers){
//             console.log('@@Trainer', trainer.name)
//             const divCard = document.createElement('div');
//             divCard.className = "card";
//             divCard.setAttribute("data-id", trainer.id);
//             main.appendChild(divCard);

//             const trainerName = document.createElement('p');
//             divCard.appendChild(trainerName);
//             trainerName.innerText = trainer.name;            

//             const addButton = document.createElement('button');
//             addButton.setAttribute("data-trainer-id", trainer.id);
//             addButton.innerText = "Add Pokemon";
//             divCard.appendChild(addButton);

//             addButton.addEventListener('click', function(addPokemon){
                
//                 addPokemon.preventDefault();

//                 let formData = {
//                     trainer_id: addButton.getAttribute('data-trainer-id')
//                 };
                   

//                 let configObj = {
//                     method: "POST",
//                     headers: {
//                       "Content-Type": "application/json",
//                       "Accept": "application/json"
//                     },
//                     body: JSON.stringify(formData)
//                   };
                   
//                   fetch(POKEMONS_URL, configObj)

//                     .then(function(response) {
//                         console.log('@@Responding...', response);
//                         return response.json();
//                     })
//                     .then(function(object) {
//                         console.log(object);
//                     })
//                     .catch(function(error) {
//                         alert("Sorry, can't successfully add a new Pokemon to team!");
//                         console.log(error.message);
//                     });   
                    
//             });


//             const unorderedList = document.createElement('ul');
//             for (let i = 0; i < trainer.pokemons.length; i++){
//                 const specificPokemon = document.createElement('li')
//                 specificPokemon.innerText = trainer.pokemons[i].nickname + ' ' + '(' + trainer.pokemons[i].species + ')'
//                 const releaseButton = document.createElement('button')
//                 releaseButton.className = 'release'
//                 releaseButton.setAttribute("data-pokemon-id", trainer.pokemons[i].id)
//                 releaseButton.innerText = "Release"
//                 specificPokemon.appendChild(releaseButton)
//                 unorderedList.appendChild(specificPokemon)

//                 releaseButton.addEventListener('click', function(releasePokemon){

//                     releasePokemon.preventDefault();

//                     let formData = {
//                         pokemon_id: releaseButton.getAttribute('data-pokemon-id')
//                     };
                       
    
//                     let configObj = {
//                         method: "DELETE",
//                         headers: {
//                           "Content-Type": "application/json",
//                           "Accept": "application/json"
//                         },
//                         body: JSON.stringify(formData)
//                       };
                       
//                       fetch(POKEMONS_URL, configObj)
    
//                         .then(function(response) {
//                             console.log('@@Deleting...', response);
//                             return response.json();
//                         })
//                         .then(function(object) {
//                             unorderedList.removeChild(specific_pokemon);
//                             console.log(object);
//                         })
//                         .catch(function(error) {
//                             alert("Sorry, can't successfully add a new Pokemon to team!");
//                             console.log(error.message);
//                         });   
                        
//                 });                
                

//             }      
            
//             divCard.appendChild(unorderedList)

//         }

//       })    

// });


