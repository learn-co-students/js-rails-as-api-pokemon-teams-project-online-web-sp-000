const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers();
});

function fetchTrainers() {
    fetch(TRAINERS_URL)
        .then(
            resp => resp.json()
        )
        .then(
            json => json.forEach(trainer => createTrainer(trainer))
        )
}

function createTrainer(trainer_obj) {
    let main = document.getElementsByTagName('main')[0]

    let div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = trainer_obj.id;

    let p = document.createElement('p');
    p.textContent = trainer_obj.name;
    div.appendChild(p);

    let btn = document.createElement('button');
    btn.dataset.trainerId = trainer_obj.id;
    btn.textContent = 'Add Pokemon';
    btn.onclick = addPokemon;
    div.appendChild(btn);

    let ul = document.createElement('ul');
    for (const pokemon of trainer_obj.pokemons) {
        ul.appendChild(generatePokemon(pokemon));
    }
    div.appendChild(ul);

    main.appendChild(div);
    
}

function generatePokemon(pokemon_obj) {
    let li = document.createElement('li');
    li.textContent = `${pokemon_obj.nickname} (${pokemon_obj.species})`;

    let btn = document.createElement('button');
    btn.innerText = 'release';
    btn.classList.add('release');
    btn.dataset.pokemonId = pokemon_obj.id;
    btn.onclick = deletePokemon;
    li.appendChild(btn);
    return li;
}

function addPokemon(e) {
    let ul = e.target.nextSibling;
    if (ul.children.length < 6) {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'trainer_id': e.target.dataset.trainerId
            })
        }
        fetch(POKEMONS_URL, options)
            .then(
                resp => resp.json()
            )
            .then(
                json => ul.appendChild(generatePokemon(json))
            );
    }
}

function deletePokemon(e) {
    let li = e.target.parentNode;
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`,options)
        .then(
            li.remove()
        )
}