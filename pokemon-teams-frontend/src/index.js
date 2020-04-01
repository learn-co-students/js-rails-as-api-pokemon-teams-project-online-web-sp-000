document.addEventListener("DOMContentLoaded", ()=>{
    
    
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    let trainerHead = document.querySelector ("body")
    // let pokemonList = document.querySelectorAll("ul")
    // let pokemonUl = document.querySelector ("main")
    // pokemonsTeam = document.querySelectorAll("ul")
    
    
    
    
    
    fetch("http://localhost:3000/trainers")
    .then(response => response.json())
    .then(trainerList => {
        trainerList.forEach(trainer => {
            
            trainerDiv = document.createElement("div")
            
            trainerDiv.innerHTML = `<button name="add_pokemon" class ="pokemonButton-${trainer.id}" id="${trainer.id}">Add Pokemon</button><ul id="pokemon-list-${trainer.id}"></ul></div>`
            
            trainerHead.append(trainerDiv)
           
            let addButton = document.querySelector(`.pokemonButton-${trainer.id}`)
        
            // console.log(addButton)
        // addButton.forEach(button => {
        // console.log("hello")
    
        addButton.addEventListener("click", function (e){
            e.preventDefault(e)
            // console.log(e.target.id)
    
         trainer_id = e.target.id



        fetch("http://localhost:3000/pokemons", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"

            },
            body:JSON.stringify({
             trainer_id:trainer_id 
            })


        })       
        .then(r=>r.json())
        .then(newPokemon =>{
            pokemonList = document.getElementById(`pokemon-list-${trainer.id}`)
            newPoke = document.createElement("li")
            newPoke.innerHTML = newPokemon.nickname
            newPoke.innerHTML+= `<button class="release" data-pokemon-id="${newPokemon.id}">Release</button>`
            newPoke.addEventListener("click", releaseButton)
            pokemonList.append(newPoke)



        }) 
       
    }) 
    
            function releaseButton(event){
                event.preventDefault()
            debugger
            }
        //    pokemonList = document.getElementById(`pokemon-list-${trainer.id}`)
            
        //    trainer.pokemons.forEach(pokemon => {
               
               
        // //    pokemonList.innerHTML+= `<li> ${pokemon.nickname}</li>`
        //     newPoke = document.createElement("li")
        //     button = document.createElement("button") 
        //     newPoke.innerHTML = pokemon.nickname
        //     button.className = "release"
        //     button.innerHTML = "release"
        //     button.dataset.pokemonId = pokemon.id
        //     // newPoke.innerHTML+= `<button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
        //     newPoke.append(button)
            
        //     button.addEventListener("click", function(e) {
        //         console.log(e.target)

        //     fetch(`http://localhost:3000/pokemons/${newPoke.id}`, {
        //         method:"DELETE",
        //     })
    
        //        .then(r=> r.json())
        //        .then((response) =>{
        //         newPoke.remove
        //        })
           
        //        })
        //        pokemonList.append(newPoke)
        //     })
          
            
          

        
        // })
        
        
        
    











 



















