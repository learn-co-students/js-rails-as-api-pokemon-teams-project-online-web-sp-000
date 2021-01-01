const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
});

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => makeTrainers(json))
}

function makeTrainers(json) {
    const main = document.getElementsByTagName(main)[0];
    json.forEach(trainer => {
        let div = document.createElement("div");
        let p = document.createElement("p");
        let button = document.createElement("button");
        let ul = document.createElement("ul");

        div.setAttribute("class", "card")
        div.setAttribute("data-id", `${trainer.id}`)
        p.innerText(`${trainer.name}`)
        button.setAttribute("data-trainer-id", `${trainer.id}`)
        button.innerText("Add Pokemon")

        main.appendChild(div)
        div.appendChild(p)
        div.appendChild(button)
        div.appendChild(ul)

        addPokemon(button, trainer)

        trainer.pokemons.forEach(poke => {
            let li = document.createElement("li")
            let releaseButton = document.createElement("button")

            li.innerText(`${poke.name}, ${poke.species}`)
            releaseButton.setAttribute("class", "release")
            releaseButton.setAttribute("data-pokemon-id", `${poke.id}`)
            releaseButton.innerText("Release")

            ul.appendChild(li)
            li.appendChild(releaseButton)

            deletePokemon(releaseButton, poke)
        })
    })

    function addPokemon(button, trainer) {
        let fetchObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"trainer_id": trainer.id})
        }
        button.addEventListener("click", event => {
            fetch(POKEMONS_URL, fetchObject)
        })
    }

    function deletePokemon(button, pokemon) {
        button.addEventListener("click", event => {
            fetch(POKEMONS_URL + "/" + `${pokemon.id}`, {
                method: "DELETE"
            })
        })
    }

}
