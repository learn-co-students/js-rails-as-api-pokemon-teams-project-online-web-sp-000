const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//we need fetch for json trainers so we can create divs
//we need fetch post to add pokemon
//I GUESS we need fetch post to delete pokemon


document.addEventListener("DOMContentLoaded", function() {
    getTrainers();
  })
  
function getTrainers() {
    fetch(TRAINERS_URL)
      .then(response => response.json())
      .then(json => addTrainers(json))
}

function addTrainers(json) {
    
    const main = document.getElementById('main');
    for (let i = 0; i < json.length; i++) {
      const div = document.createElement('div')
      div.className = "card"
      div.setAttribute('data-id', json[i].id)  //setting the data-id of a div based on the id of a json currently iterating
      
      const p = document.createElement('p')
      p.innerHTML = json[i].name
      div.appendChild(p)
      const button = document.createElement('button')
      button.setAttribute('data-trainer-id', json[i].id)//setting the trainer-data-id of a button based on the id of a json currently iterating
      button.innerHTML = "Add Pokemon"
      button.addEventListener("click", addPokemon)
      div.appendChild(button)
      const ul = document.createElement('ul')
      for (let j = 0; j < json[i].pokemons.length; j++) {
        const li = document.createElement('li')
        li.innerHTML = `${json[i].pokemons[j].nickname} (${json[i].pokemons[j].species})`
        const removeButton = document.createElement('button')
        removeButton.innerHTML = "Release"
        removeButton.className = "release"
        removeButton.setAttribute('data-pokemon-id', json[i].pokemons[j].id)
        removeButton.addEventListener("click", removePokemon)
        li.appendChild(removeButton)
        ul.appendChild(li)
      }
      div.appendChild(ul)
      main.appendChild(div)
    }

    function addPokemon() {//there is an invisible event bc this function is being called on click event
        debugger
        const trainerId = event.target.dataset.trainerId //*** when we sat data in JS we write data-trainer-id but when call it it becomes trainerId
        const trainerCard = document.querySelector('[data-id="' + trainerId + '"]')
        const numOfPokemon = trainerCard.children[2].getElementsByTagName('li').length
        
        if (numOfPokemon < 6) {
          const configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "trainer_id": trainerId //***
            })
          };
          fetch(POKEMONS_URL, configurationObject)
            .then(response => response.json())
            .then(json => updateCard(json))
            .catch(error => console.log("Error: " + error))
        } else {
          alert("This trainer already has 6 pokemon!")
        }
      
      }

      function updateCard(json) {
        const trainerCard = document.querySelector('[data-id="' + json.trainer_id + '"]')
        debugger
        const ul = trainerCard.getElementsByTagName('ul')[0]
        const li = document.createElement('li')
        li.innerHTML = `${json.nickname} (${json.species})`
        const removeButton = document.createElement('button')
        removeButton.innerHTML = "Release"
        removeButton.className = "release"
        removeButton.setAttribute('data-pokemon-id', json.id)
        removeButton.addEventListener("click", removePokemon)
        li.appendChild(removeButton)
        ul.appendChild(li)
      }
  
function removePokemon() {
    const pokemonId = event.target.dataset.pokemonId
    const configurationObject = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
    fetch(`${POKEMONS_URL}/${pokemonId}`, configurationObject) //*** */
      .then(response => response.json())
      .then(json => removePokemonFromCard(json))
      .catch(error => console.log("Error: " + error))
  }
  function removePokemonFromCard(json) {
    const pokemonId = json.id
    console.log(pokemonId)
    const pokemonLi = document.querySelector('[data-pokemon-id="' + pokemonId + '"]').parentNode //*** */
    console.log(pokemonLi)
    pokemonLi.parentNode.removeChild(pokemonLi)
  }

}
