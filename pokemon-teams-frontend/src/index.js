const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainers = document.getElementById('trainers')

trainers.addEventListener('click', (event) => {
    if (event.target.className === 'release') {
        const config = {
            method: "DELETE"
        }
        fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, config)
        .then(resp => resp.json())
        .then(data => {
            event.target.parentElement.remove()
            console.log(data)
        })
    }
})


//When a user loads the page, they should see all trainers, with their current team of Pokemon.
document.addEventListener("DOMContentLoaded", function() {
    getAllTrainers();
});

function getAllTrainers() {
    trainers.innerHTML = "";
    fetchData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => trainerCards(json))
    .catch(error => console.log(error.message))
}




function trainerCards(json) {
    json.forEach((trainer) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute ('data-id', trainer.id);
        card.innerHTML = `<p>${trainer.name}</p>`;
        
        const button = document.createElement('button');
        button.setAttribute('data-trainer-id', trainer.id);
        button.textContent = 'Add Pokemon';
        card.appendChild(button);

        const list = document.createElement('ul');
        list.setAttribute('data-trainer-id', trainer.id)
        card.appendChild(list);
        
        trainers.appendChild(card);
        displayPokemon(trainer);
    });
    //Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.
    const addPokemonButtons = card.querySelector('button');
    addPokemonButtons.addEventListener('click', (event) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        }
        fetch(POKEMONS_URL, config)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            trainerCards();
        })
    })
};

function displayPokemon(trainer) {
    
    trainer.pokemons.forEach((pokemon) => {
        
        const li = document.createElement('li');
        li.setAttribute('data-trainer-id', trainer.id)
        li.textContent = `${pokemon.nickname} (${pokemon.species})`;
        
        const releaseButton = document.createElement('button');
        releaseButton.className = 'release';
        releaseButton.setAttribute('data-pokemon-id', pokemon.id)
        releaseButton.textContent = 'Release';

        li.appendChild(releaseButton);
        document.querySelector('ul[data-trainer-id="' + trainer.id + '"]').appendChild(li);
    });
}

// function attachAddPokemonListener(e) {
    
//     const trainerId = e.target.getAttribute('data-trainer-id');
//     if (document.querySelectorAll('li[data-trainer-id="' + trainerId + '"]').length < 6) {
//       const postBody = { trainer_id: trainerId};
//       const postData = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify(postBody)
//       }
//       let fetcher = fetch(POKEMONS_URL, postData)
//       .then(resp => console.log(resp.json()))
//       .then((json) => console.log(resp))
//       .catch(error => console.log(error.message))
      
//     } else {
//       alert('Maximum 6 Pokemon per trainer!');
//     }
//   }



