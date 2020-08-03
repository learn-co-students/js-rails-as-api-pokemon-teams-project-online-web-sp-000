const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {

    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(function (json) {

        const data = json["data"];
        const included = json["included"];

        const createCard = function (index) {
            const div = document.createElement('div');
            const nameP = document.createElement('p');
            const trainerButton = document.createElement('button');
            trainerButton.innerHTML = "Add Pokemon";
            div.classList = "card";
            div.dataset.id = index['id'];
            trainerButton.dataset.trainerId = index['id'];
            nameP.innerHTML = index['attributes']['name'];
            const ul = document.createElement("ul");
            const pokemonIds = [];
            index['relationships']['pokemons']['data'].forEach(el => {
                pokemonIds.push(el["id"]);
            });

            for (let i = 0; i < pokemonIds.length; i++) {
                for (let y = 0; y < included.length; y++) {
                    if(pokemonIds[i] == included[y]['id']) {
                        const pokemon = included[y]
                        const li = document.createElement('li');
                        li.innerHTML = `${pokemon['attributes']['nickname']} (${pokemon['attributes']['species']}) `;
                        const button = document.createElement('button');
                        button.className = "release";
                        button.innerHTML = "Release";
                        button.dataset.pokemonId = pokemon['id'];
                        li.appendChild(button);
                        ul.appendChild(li);
                    }
                }
            }
            div.appendChild(nameP);
            div.appendChild(trainerButton);
            div.appendChild(ul);
            document.querySelector('main').appendChild(div);
        }
        for (let i = 0; i < data.length; i++) {
            createCard(data[i])
        }
    })

    setTimeout(function() {
        document.querySelectorAll('button[data-trainer-id]').forEach(el => {
            el.addEventListener('click', function(event) {
                let trainerId = event.target.dataset.trainerId;
                let configObj = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        trainerId: trainerId
                    })
                }
                fetch(POKEMONS_URL, configObj)
                .then(resp => resp.json())
                .then(
                    function(json) {
                        const li = document.createElement('li');
                        li.innerHTML = `${json['nickname']} (${json['species']})`;
                        const button = document.createElement('button');
                        button.classList = "release";
                        button.innerHTML = "Release";
                        button.dataset.pokemonId = json['id'];
                        li.appendChild(button)
                        el.nextSibling.appendChild(li)
                    }
                )
                .catch(function () {
                    console.log(json['message'])
                })
            })
        })
    }, 2000);

    setTimeout(function() {
        document.querySelectorAll('button[data-pokemon-id]').forEach(el => {
            el.addEventListener('click', function(event) {
                let pokemonId = event.target.dataset.pokemonId;
                let configObj = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        pokemonId: pokemonId
                    })
                }
                fetch(`${POKEMONS_URL}/${el.dataset.pokemonId}`, configObj)
                .then(resp => resp.json())
                .then(
                    function(json) {
                        console.log(json)
                        el.parentNode.remove();
                    }
                )
                .catch(function (error) {
                    console.log(error.message);
                })
            })
        })
    }, 2000)

})
