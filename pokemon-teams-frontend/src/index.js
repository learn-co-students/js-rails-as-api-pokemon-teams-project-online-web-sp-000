document.addEventListener("DOMContentLoaded", ()=>{
    
    
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    let trainerHead = document.querySelector ("body")
    let pokemonList = document.querySelectorAll("ul")
    let pokemonUl = document.querySelector ("main")
    pokemonsTeam = document.querySelectorAll("ul")
    
    

fetch("http://localhost:3000/trainers")
.then(response => response.json())
.then(trainerList => {
    trainerList.forEach(trainer => {
     
       trainerDiv = document.createElement("div")
       trainerUl =  document.createElement("ul")
        trainerDiv.innerHTML = `<div class="card" data-id="1"><p>${trainer.name}</p>
        <button data-trainer-id="1">Add Pokemon</button>`
        
        trainerHead.append(trainerDiv)
        
        trainer.pokemons.forEach(pokemon => {
           
           
            pokemonLi = document.createElement("li")
            pokemonLi.innerHTML = `<ul>
            <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
            <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
            <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
            <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
            <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
          </ul>`
             
            trainerUl.append(pokemonLi)
            

        
        })
        
        
        
        
 
        })
    });
})

 

// button.addEventListener("click", function (e){
    
//     button.innerHTML =" Realese "
//     button.append(pokemonUl)
// })




// fetch ("http://localhost:3000/trainers",{
//     method: "POST",
//     headers:{
//         "content-type":"application/json",
//         "accept":"application/json"
//     },
//     body: JSON.stringify({
//     id:
//     nickname:Pokemon.nickname
//     species:Pokemon.species
//     trainer_id: Trainer.id
// })
// })

// .then(r => r.json())
// .then(newToy => {
//     console.log(newToy)










