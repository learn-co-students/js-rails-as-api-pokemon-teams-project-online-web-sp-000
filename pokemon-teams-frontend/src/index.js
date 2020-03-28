const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getTrainers() {
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => createTrainers(trainers))
}

function createTrainers(trainers) {
    main = document.querySelector('main')
    for (const trainer of trainers) {
        makeTrainerCard(trainer)
    }

    function addPokemon(trainer) {
        configObj = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(trainer)
        }

        fetch(POKEMONS_URL, configObj)
            .then(function(response) {
                return response.json();
            })
            .then(function(object) {
                console.log(object)
                ul = document.querySelector("div[data-id='" + trainer.id + "'] ul");
                li = document.createElement('li')
                libutton = document.createElement('button')
                libutton.innerText = "Release"
                libutton.classList.add("release")
                li.innerText = `${object.species} (${object.nickname})`
                li.appendChild(libutton)
                ul.appendChild(li)
            });
    }

    function makeTrainerCard(trainer) {
        card = document.createElement('div')
        card.classList.add("card")
        card.setAttribute('data-id', trainer.id)

        p = document.createElement('p')
        p.innerText = trainer.name

        button = document.createElement('button')
        button.innerText = "Add Pokemon"
        button.setAttribute('data-trainer-id', trainer.id)
        button.addEventListener('click', function(event) {
            addPokemon(trainer)
        })

        ul = document.createElement('ul')
        for (const pokemon of trainer.pokemons) {
            li = document.createElement('li')
            libutton = document.createElement('button')
            libutton.innerText = "Release"
            libutton.classList.add("release")
            li.innerText = `${pokemon.species} (${pokemon.nickname})`

            li.appendChild(libutton)
            ul.appendChild(li)
        }


        card.appendChild(p)
        card.appendChild(button)
        card.appendChild(ul)

        main.appendChild(card)
    }

}

getTrainers()