const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
    .then(resp =>  resp.json())
    .then(json => {
        console.log(json)
        for (const trainer of json) {
            const main = document.querySelector('main');
            const card = document.createElement('div')
            card.className = 'card';

            const p = document.createElement('p');
            p.innerHTML = trainer.name;
            card.appendChild(p);

            const addPButton = document.createElement('button');
            addPButton.innerHTML = 'Add Pokemon';
            addPButton.addEventListener('click', function(){
                // console.log(trainer.id);
                // console.log(trainer.pokemons.length)
                if (trainer.pokemons.length !== 6) {
                    //i need to send post request and add pokemon
                    const formData = {
                        trainerId: trainer.id
                    }
                    const configObj = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                    fetch(POKEMONS_URL, configObj)
                        .then(resp => resp.json())
                        .then(json => {
                            // console.log(json);
                            const li = document.createElement('li');
                            li.innerHTML = `${json.nickname} (${json.species}) `;
                            const releaseButton = document.createElement('button');
                            releaseButton.className = 'release';
                            releaseButton.addEventListener('click', function(){
                                const configObj = {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json"
                                    }
                                }
                                fetch(`${POKEMONS_URL}/${json.id}`, configObj)
                                ul.removeChild(li);
                            })
                            li.appendChild(releaseButton);
                            ul.appendChild(li);
                        });
                }
            })
            // addPButton.setAttribute('data-trainer-id', trainer.id);
            card.appendChild(addPButton);


            const ul = document.createElement('ul');
            for (const pokemon of trainer.pokemons) {
                const li = document.createElement('li');
                li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `;
                const releaseButton = document.createElement('button');
                releaseButton.className = 'release';
                releaseButton.addEventListener('click', function(){
                    //i need to send delete request
                    //DELETE /pokemons/:id
                    const configObj = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    }
                    fetch(`${POKEMONS_URL}/${pokemon.id}`, configObj)
                    ul.removeChild(li);
                })
                li.appendChild(releaseButton);
                ul.appendChild(li);
            }
            card.appendChild(ul);

            main.appendChild(card);
            
            // console.log('hello??')
        }
    })