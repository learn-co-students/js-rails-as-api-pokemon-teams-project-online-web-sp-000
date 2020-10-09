const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const main = document.querySelector('main');

    fetch('http://127.0.0.1:3000/trainers')
    .then(function(response) {
        return response.json();
      })
      .then(function(trainers){
        console.log('@@Hello', trainers)
        for (trainer of trainers){
            console.log('@@Trainer', trainer.name)
            const divCard = document.createElement('div');
            divCard.className = "card";
            divCard.setAttribute("data-id", trainer.id);
            main.appendChild(divCard);

            const trainerName = document.createElement('p');
            divCard.appendChild(trainerName);
            trainerName.innerText = trainer.name;            

            const addButton = document.createElement('button');
            addButton.setAttribute("data-trainer-id", trainer.id);
            addButton.innerText = "Add Pokemon";
            divCard.appendChild(addButton);

            addButton.addEventListener('click', function(addPokemon){
                
                addPokemon.preventDefault();

                let formData = {
                    trainer_id: addButton.getAttribute('data-trainer-id')
                };
                   

                let configObj = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                  };
                   
                  fetch("http://127.0.0.1:3000/pokemons", configObj)

                    .then(function(response) {
                        console.log('@@Responding...', response);
                        return response.json();
                    })
                    .then(function(object) {
                        console.log(object);
                    })
                    .catch(function(error) {
                        alert("Sorry, can't successfully add a new Pokemon to team!");
                        console.log(error.message);
                    });   
                    
            });


            const unorderedList = document.createElement('ul');
            for (let i = 0; i < trainer.pokemons.length; i++){
                const specificPokemon = document.createElement('li')
                specificPokemon.innerText = trainer.pokemons[i].nickname + ' ' + '(' + trainer.pokemons[i].species + ')'
                const releaseButton = document.createElement('button')
                releaseButton.className = 'release'
                releaseButton.setAttribute("data-pokemon-id", trainer.pokemons[i].id)
                releaseButton.innerText = "Release"
                specificPokemon.appendChild(releaseButton)
                unorderedList.appendChild(specificPokemon)

                releaseButton.addEventListener('click', function(releasePokemon){

                    releasePokemon.preventDefault();

                    let formData = {
                        pokemon_id: releaseButton.getAttribute('data-pokemon-id')
                    };
                       
    
                    let configObj = {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                        },
                        body: JSON.stringify(formData)
                      };
                       
                      fetch("http://127.0.0.1:3000/pokemons", configObj)
    
                        .then(function(response) {
                            console.log('@@Deleting...', response);
                            return response.json();
                        })
                        .then(function(object) {
                            console.log(object);
                        })
                        .catch(function(error) {
                            alert("Sorry, can't successfully add a new Pokemon to team!");
                            console.log(error.message);
                        });   
                        
                });                
                

            }      
            
            divCard.appendChild(unorderedList)

        }

      })    

});


