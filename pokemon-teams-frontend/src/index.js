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
        card = document.createElement('div')
        card.classList.add("card")

        p = document.createElement('p')
        p.innerText = trainer.name

        button = document.createElement('button')
        button.innerText = "Add Pokemon"

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