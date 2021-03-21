const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetch(`${TRAINERS_URL}`)
    .then(resp => resp.json())
    .then(json => displayTrainers(json));

    
    function displayTrainers(trainers) {
        for(trainer of trainers) {
            createTrainerCard(trainer)
        }
    }
    
    fetch(`${POKEMONS_URL}`)
    .then(resp => resp.json())
    .then(json => displayPokemons(json));
    
    function displayPokemons(pokemons) {
        for(pokemon of pokemons) {
            displayPokemon(pokemon)
        } 
    }
    
    function createTrainerCard(trainer) {
        const main = document.querySelector('main');
        let div = document.createElement("div");
        div.className = "card"
        div.setAttribute('data-id', trainer.id);
    
        let p = document.createElement("p");
        p.innerText = trainer.name;
        div.appendChild(p);
    
        let button = document.createElement('button');
        button.setAttribute('data-trainer-id', trainer.id);
        button.innerHTML = "Add Pokemon";
        button.addEventListener("click", function(e){
            e.preventDefault();
            createPokemon(trainer);
            //console.log(trainer)
        });
        div.appendChild(button);
    
        let ul = document.createElement("ul");
        div.appendChild(ul);
    
    
        main.appendChild(div);
    
    }
    
    function createPokemon(trainer) {
        list = document.querySelector(`div[data-id="${trainer.id}"] ul`)
        
        if (!(list.querySelectorAll("li").length === 6)) {
            const pokemonData = {
                trainer_id: trainer.id
            };
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(pokemonData)
            };
            fetch(`${POKEMONS_URL}`, configObj)
                .then(function(response) {
                    return response.json();
                })
                .then(function(object) {
                    displayPokemon(object);
            });
        }
    }
    
    function displayPokemon(pokemon) {
        //console.log(pokemon)
        const list = document.querySelector(`div[data-id='${pokemon.trainer_id}'] ul`)
        //console.log(list)
        const li = document.createElement("li");
        li.innerText = `${pokemon.nickname}(${pokemon.species})`
    
        let button = document.createElement('button');
        button.className = "release";
        button.innerHTML = "Release";
        button.addEventListener("click", function(e){
            e.preventDefault();
            deletePokemon(li, pokemon)
        });
        li.appendChild(button);
    
        list.appendChild(li);
    }
    
    function deletePokemon(li, pokemon) {
        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(response => response.json());
        li.remove()
    }
  
});


