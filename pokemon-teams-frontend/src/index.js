const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function createCard(trainer)
{
  const div = document.createElement("div");
  div.setAttribute("class", "card");
  div.setAttribute("data-id", trainer.id);
  const p = document.createElement("p");
  p.textContent = trainer.attributes.name;
  div.appendChild(p);
  const button = document.createElement("button");
  button.setAttribute("data-trainer-id", trainer.id);
  button.setAttribute("onClick","addPokemon(this)");
  button.textContent = "Add Pokemon";
  div.appendChild(button);
  const ul = document.createElement("ul");
  div.appendChild(ul);
  for (var i = 0; i < trainer.attributes.pokemons.length; i++) {
    addPokemonLI(trainer.attributes.pokemons[i].nickname,trainer.attributes.pokemons[i].species, trainer.attributes.pokemons[i].id, ul)
    }
  main[0].appendChild(div);
}


function getTrainers() 
{      
    fetch('http://localhost:3000/trainers')
        .then(response => response.json())
        .then(object => 
            object.data.forEach(createCard)
        )
}

function addPokemon(caller) 
{ 

    let configObj = {
        method: "POST",          
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
        "trainer_id": caller.getAttribute("data-trainer-id")
        })
    };
    
    return fetch("http://localhost:3000/pokemons", configObj)
        .then(function(response) {
        return response.json();
        })
        .then(function(object) {     
            console.log(object);    
            console.log(object.data.id);
            console.log(object.data.attributes.nickname);
            console.log(object.data.attributes.species);
            console.log(caller.parentNode.getElementsByTagName('ul')[0]);
            addPokemonLI(object.data.attributes.nickname,object.data.attributes.species,object.data.id,caller.parentNode.getElementsByTagName('ul')[0])
        })
        .catch(function(error) {
        alert("Bad things! Ragnarők!");                 
        console.log(error.message);
        }); 
}

function addPokemonLI(nickname,species,id,ul)
{
    const li = document.createElement("li");
    li.textContent = `${nickname} (${species})`;
    const releaseButton = document.createElement("button");
    releaseButton.setAttribute("class","release");
    releaseButton.setAttribute("data-pokemon-id",id);
    releaseButton.setAttribute("onClick","releasePokemon(this)");
    releaseButton.textContent = "Release";
    li.appendChild(releaseButton);
    ul.appendChild(li);
}

function releasePokemon(caller) 
{ 
    caller.parentNode.parentNode.removeChild(caller.parentNode);

    fetch('http://localhost:3000/pokemons/' + caller.getAttribute("data-pokemon-id"), {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(object => 
          console.log(object)
      )   
}

const main = document.getElementsByTagName('main');

document.addEventListener("DOMContentLoaded", () => {  
    getTrainers();
  });