const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
    fetch(TRAINERS_URL)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        createTrainerCards(json);
    });


    function createTrainerCards(trainers){
        for (const trainer of trainers){
            let card = document.createElement('div')
            let ul = document.createElement('ul')
            card.appendChild(ul)
            let pokemons = trainer["pokemons"]
            document.querySelector('main').appendChild(card)
            card.className = "card"
            card.id = trainer["id"]
            formatTrainers(trainer)
            for (const pokemon of pokemons){
                formatPokemon(pokemon)
            }
        }
    }

    function formatTrainers(trainer){
        let p = document.createElement('p')
        let button = document.createElement('button')
        let card = document.getElementById(trainer.id)

        p.innerHTML = `${trainer["name"]}`

        card.appendChild(p)
        card.appendChild(button)
        button.addEventListener('click', addPokemon)
        card.className = "card"

        button.setAttribute("data-trainer-id", trainer["id"])
        button.innerHTML = "Add Pokemon"
        button.className = "add-pokemon"

    }

    function formatPokemon(pokemon) {
            let card = document.getElementById(pokemon.trainer_id)
            let li = document.createElement('li')
            let button = document.createElement('button')
            card.appendChild(li)

            li.innerHTML = `${pokemon["nickname"]}(${pokemon["species"]})`
            button.innerHTML = "Release"
            button.className = "release"
            button.setAttribute("data-pokemon-id", pokemon["id"]);
            button.addEventListener('click', deletePokemon)

            li.appendChild(button)          

    }


    function addPokemon(e){
        e.preventDefault()
        const configObject = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                trainer_id: e.target.dataset.trainerId
            })

        }

        fetch(POKEMONS_URL, configObject)
        .then(function(response){
            return response.json()
        })
        .then(function(json){
            formatPokemon(json)
        })
        .catch(function(error){
            alert("The maximum amount of Pokemons you can have on a team is 6. You cannot add any more Pokemons.");
        })
    }

    function deletePokemon(e){
        e.preventDefault()
        let pokemonId = e.target.dataset.pokemonId
        let URL = `${POKEMONS_URL}/${pokemonId}`

        fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        })

        e.target.parentElement.remove()

    }
        

});

