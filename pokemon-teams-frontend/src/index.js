const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main");

function renderPokemon(pokemon) {
    const select = String(pokemon.relationships.trainer.data.id);
    const trainer_div = document.querySelector(`[data-id="${select}"]`);
    const trainer_ul = trainer_div.querySelector('ul');
    const li = document.createElement('li');
    const name = pokemon.attributes.nickname;
    const species = pokemon.attributes.species;
    li.innerHTML = `${name} (${species})`;
    const btn = document.createElement('button');
    btn.setAttribute('class', 'release');
    btn.setAttribute('data-pokemon-id', pokemon.id);
    btn.innerHTML = 'Release';
    li.appendChild(btn);
    trainer_ul.appendChild(li);

    btn.addEventListener('click', () => {
        // const pokemon_id = { pokemon_id: pokemon.id };
        const configObj = {
            method: 'DELETE',
            header: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
            // body: JSON.stringify( pokemon_id )
        };

        fetch(POKEMONS_URL + `/${pokemon.id}`, configObj)
            .then( () => {
                btn.parentElement.remove();
            })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    fetch(TRAINERS_URL)
        .then( response => response.json() )
        .then( function(train_obj) {
            const trainers = train_obj['data'];
            trainers.forEach(trainer => {
                const div = document.createElement('div');
                div.setAttribute('class', 'card');
                div.setAttribute('data-id', trainer.id);
                const p = document.createElement('p');
                p.innerHTML = trainer.attributes.name;
                const btn = document.createElement('button');
                btn.setAttribute('data-trainer-id', trainer.id);
                btn.innerHTML = 'Add Pokemon';
                const ul = document.createElement('ul');
                div.append(p, btn, ul);
                main.appendChild(div);

                btn.addEventListener('click', () => {
                    const trainer_id = { trainer_id: trainer.id };
                    const configObj = {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'Accept':'application/json'
                        },
                        body: JSON.stringify( trainer_id )
                    };

                    fetch(POKEMONS_URL, configObj)
                        .then( response => response.json() )
                        .then( function(new_poke_obj) {
                            const new_pokemon = new_poke_obj['data'];
                            renderPokemon(new_pokemon);
                        })
                        .catch( function() {
                            console.log(`No more space on ${trainer.attributes.name}'s team`);
                        })
                })
            })

            // fetch(POKEMONS_URL) is called AFTER fetch(TRAINERS_URL) is called and trainer elements have been added to the DOM to ensure trainer elements already exist before pokemon elements are added.
            // Calling fetch(POKEMONS_URL) outside of second .then() function will allow fetch(POKEMONS_URL) to run BEFORE fetch(TRAINERS_URL), which is not the desired behavior.
            return fetch(POKEMONS_URL);
        })
        .then( response => response.json() )
        .then( function(poke_obj) {
            const pokemons = poke_obj['data'];
            pokemons.forEach(pokemon => {
                renderPokemon(pokemon);
            })
        })
})