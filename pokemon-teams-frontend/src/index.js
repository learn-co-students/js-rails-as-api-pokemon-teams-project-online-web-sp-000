const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(obj => {
        for (let i = 0; i < obj.length; i++) {
            let newTrainer = document.createElement("div");
            newTrainer.className = "card";
            newTrainer.dataset.id = (obj[i].id);
            newTrainer.innerHTML = 
                `<p> ${obj[i].name} <p>
                <button data-trainer-id=${obj[i].id}> Add Pokemon </button>
                <ul></ul>`
            let addButton = newTrainer.querySelector("button");
            addButton.addEventListener("click", function(event) {
                event.preventDefault();
                console.log("add");
                let formData = {
                    trainerId: event.target.getAttribute("data-trainer-id"),
                }
                let configObj = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
                fetch ("http://localhost:3000/pokemons", configObj)
                .then(resp => resp.json())
                .then(obj => {
                    console.log(obj);
                    console.log(newTrainer);
                    let pokemonLi = document.createElement("li");
                    pokemonLi.innerHTML = `${obj["nickname"]} (${obj["species"]})<button class="release" data-pokemon-id=${obj["id"]}> Release </button>`;
                    let releaseButton = pokemonLi.querySelector("button");
                    releaseButton.addEventListener("click", function(event) {
                        event.preventDefault();
                        console.log("release");
                        let formData = {
                            pokemonId: event.target.getAttribute("data-pokemon-id")
                        }
                        let configObj = {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify(formData)
                        }
                        fetch ("http://localhost:3000/pokemons/:pokemon_id", configObj)
                        .then(resp => resp.json())
                        .then(obj => {
                            console.log(obj);
                            event.target.parentNode.remove();
                        });
                        
                    })
                    let trainerUl = newTrainer.querySelector("ul");
                    trainerUl.appendChild(pokemonLi);
                });
            });
            for (let j = 0; j < obj[i].pokemons.length; j++) {
                let li = document.createElement("li");
                li.innerHTML = `${obj[i].pokemons[j].nickname} (${obj[i].pokemons[j].species})<button class="release" data-pokemon-id=${obj[i].pokemons[j].id}> Release </button>`;
                let releaseButton = li.querySelector("button");
                releaseButton.addEventListener("click", function(event) {
                    event.preventDefault();
                    console.log("release");
                    let formData = {
                        pokemonId: event.target.getAttribute("data-pokemon-id")
                    }
                    let configObj = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                    fetch ("http://localhost:3000/pokemons/:pokemon_id", configObj)
                    .then(resp => resp.json())
                    .then(obj => {
                        console.log(obj);
                        event.target.parentNode.remove();
                    });
                    
                })
                newTrainer.querySelector("ul").appendChild(li);
            }
            let main = document.querySelector("main");
            main.appendChild(newTrainer);
        }
    });
});