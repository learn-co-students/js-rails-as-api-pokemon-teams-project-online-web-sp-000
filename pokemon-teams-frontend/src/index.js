const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(POKEMONS_URL)
.then(response => response.json())
.then(object => object.forEach(poke => {
    const p = document.createElement('p');
    const m = document.querySelector('main');
    p.innerText = poke.nickname; 
    m.appendChild(p);
})
)

fetch(TRAINERS_URL)
.then(response => response.json())
.then(object => object.forEach(trainer => console.log(trainer.name)));