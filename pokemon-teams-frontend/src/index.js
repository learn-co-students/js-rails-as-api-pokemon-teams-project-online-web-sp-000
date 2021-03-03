const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
       getPokemon();
    
})




function getPokemon(){
    fetch(POKEMONS_URL)
    .then(res => res.json())
    .then(pokemons => {
        
        console.log(pokemons)
        pokemons.data.forEach(pokemon => {
            // debugger;
            // debugger;
           const renderPokemons = `
           <div class="card" data-id="${pokemon.attributes.trainer_id}"><p>${pokemon.attributes.trainer.name}</p>
            <button data-trainer-id="${pokemon.attributes.trainer_id}">Add Pokemon</button>
            <ul>
            <li>${pokemon.attributes.nickname} (${pokemon.attributes.species}) <button class="release" data-pokemon-id="${pokemon.id} onclick="removePokemon()">Release</button></li>
            </ul>
            </div>
           
           
           `
           document.getElementsByTagName('main')[0].innerHTML +=
           renderPokemons

        })
    })
}





function removePokemon(event){
    let pokemonId = event.target.dataset.id
debugger;
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
      
        
    })
   
}
// function renderTrainers(trainers){
//     const main = document.getElementsByTagName('main')[0];
//     for (let i=0; i<trainers.length; i++){
//         const div = document.createElement("div")
//     }
// }