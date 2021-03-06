const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener('DOMContentLoaded', () => {
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

console.log('DOM')

fetch(POKEMONS_URL)
.then(res => res.json())
.then(pokemons => {
    pokemons.data.forEach(pokemon => {
        pokemon.count
    })
});

fetch(TRAINERS_URL)
.then(res => res.json())
.then(trainers => {
   trainers.forEach(trainer => {
    addTrainer(trainer)
   })

   
})
})




function addTrainer(trainer){
    const main = document.querySelector("body > main");
    const div = document.createElement('div');
    div.className = "card"
    div.setAttribute('data-id', trainer.id)
    main.appendChild(div)  
    const p = document.createElement('p')
    p.innerHTML = trainer.name
    div.appendChild(p)
    const button = document.createElement('button')
    button.setAttribute('data-trainer-id', trainer.id)
    button.innerHTML = "Add Pokemon"
    div.appendChild(button)
    // button.addEventListener('click', (e) => {
    //     addPokemon(e.target.id)
    // })
    button.addEventListener('click', addPokemon)
    const ul = document.createElement('ul')
    div.appendChild(ul)
     trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
    
    }

    const renderPokemon = (pokemon) => {
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement('li')
    const releseBtn = document.createElement('button');

    
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

    releseBtn.className = "release";     
    releseBtn.setAttribute('data-pokemon-id', pokemon.id);
    releseBtn.innerHTML = "Relese"
    // releseBtn.addEventListener('click', (e) => {
    //     e.target.parentNode.remove()
    //     relasePokemon(e.target.id)
    // })
    releseBtn.addEventListener('click',relasePokemon)
    ul.appendChild(li) 
    li.appendChild(releseBtn);
}
    

    const addPokemon = (e) => {
        e.preventDefault()
       
        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
        }
        fetch(POKEMONS_URL, configObject)
        .then(res => res.json())
        .then(json => {
            if(json.message){
                alert(json.message)
            }else{
                renderPokemon(json)
            }
        })
        
    }

    function relasePokemon(e){
        e.preventDefault()
        const configObject = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }

        fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObject)
        e.target.parentElement.remove()
    }

    // <!-- <div class="card" data-id="1"><p>Prince</p>
    //     <button data-trainer-id="1">Add Pokemon</button>
    //     <ul>
    //       <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    //       <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    //       <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    //       <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    //       <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
    //     </ul>
    //   </div> -->