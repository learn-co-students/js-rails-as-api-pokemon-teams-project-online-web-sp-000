const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")
function createPokemon(pokemon, ul) {
  const li = document.createElement('li')
  li.textContent = `${pokemon.nickname} (${pokemon.species}) `
  ul.appendChild(li)
  const releaseButton = document.createElement('button')
  releaseButton.textContent = "Release"
  releaseButton.classList.add("release")
  releaseButton.setAttribute("data-pokemon-id", pokemon.id)
  li.appendChild(releaseButton)
  releaseButton.addEventListener("click", function() {
    let configurationObject = {
      method: "DELETE"
    };
    fetch(POKEMONS_URL + "/" + pokemon.id, configurationObject)
    .then(function() {
      li.remove();
    });
  })
}
document.addEventListener("DOMContentLoaded", () => {
  fetch(TRAINERS_URL)
    .then(function(response) {
      return response.json()
    })
    .then(function(trainers) {
      for (const trainer of trainers) {
        const div = document.createElement('div')
        div.classList.add("card")
        div.setAttribute("data-id", trainer.id)
        main.appendChild(div)
        const p = document.createElement('p')
        p.textContent = trainer.name
        div.appendChild(p)
        const button = document.createElement("button")
        
        button.setAttribute("data-trainer-id", trainer.id)
        button.textContent = "Add Pokemon"
        div.appendChild(button)
        const ul = document.createElement('ul');
        div.appendChild(ul)
        button.addEventListener("click", function () {
          let configurationObject = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              trainer_id: trainer.id
            })
          };
          fetch(POKEMONS_URL, configurationObject)
          .then(function(response) {
            return response.json()
          })
          .then(function(json) {
            createPokemon(json, ul)
          })
          .catch(function(error) {
            alert("You can only have 6 Pokemon");
            console.log(error.message);
          });
        });
        
        for (const pokemon of trainer.pokemons) {
          createPokemon(pokemon, ul)
        }
        
      };
    });
  });