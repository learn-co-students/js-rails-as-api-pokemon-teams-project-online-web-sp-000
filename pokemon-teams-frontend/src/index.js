const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const main = document.querySelector('main');    

    const divCard = document.createElement('div');
    divCard.className = "card";
    divCard.setAttribute("data-id", "1");
    main.appendChild(divCard);


    const trainerName = document.createElement('p')
    divCard.appendChild(trainerName)
    trainerName.innerText = "Prince"


    const addButton = document.createElement('button')
    addButton.setAttribute("data-trainer-id", "1")
    addButton.innerText = "Add Pokemon"
    divCard.appendChild(addButton)

    const unorderedList = document.createElement('ul')
    const specificPokemon = document.createElement('li')
    specificPokemon.innerText = "Jacey (Kakuna)"
    const releaseButton = document.createElement('button')
    releaseButton.className = 'release'
    releaseButton.setAttribute("data-pokemon-id", "140")
    releaseButton.innerText = "Release"
    specificPokemon.appendChild(releaseButton)
    unorderedList.appendChild(specificPokemon)
    divCard.appendChild(unorderedList)

});