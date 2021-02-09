const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", ()=>{
  fetch("http://localhost:3000")
  .then(function(response){
    return response.json()
  })
  .then(function(json){
    for (const trainer of json){
      let card = document.createElement('div')
      card.className = "card"
      card.dataset.id = trainer.id
      let trainerName = document.createElement('p')
      trainerName.innerHTML = trainer.name
      card.appendChild(trainerName)
      let addPoke = document.createElement('button')
      addPoke.innerText = "Add Pokemon"
      addPoke.addEventListener('click', ()=>{
        let list = document.querySelector(`div[data-id = "${trainer.id}"] ul`)
        if (list.childElementCount < 6){
          let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(trainer.id)
          };
          fetch(POKEMONS_URL, configObj)
          .then(function(response){
            return response.json()
          })
          .then(function(json){
            let poke = document.createElement("li")
            let releaseButton = document.createElement('button')
            releaseButton.innerHTML = "Release"
            releaseButton.className = "release"
            releaseButton.addEventListener('click', ()=>{
              let configObj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(json.id)
              };
              fetch(POKEMONS_URL+"/destroy", configObj)
              .then(function(response){
                return response.json()
              })
              .then(function(json){
                alert(json.message)
                poke.remove()
              })
            })
            poke.innerHTML = json.nickname + " (" + json.species + ")"
            poke.appendChild(releaseButton)
            roster.appendChild(poke)
          })
        }
      })
      card.appendChild(addPoke)
      let roster = document.createElement("ul")
      for (const pokemon of trainer.pokemons){
        let poke = document.createElement("li")
        let releaseButton = document.createElement('button')
        releaseButton.innerHTML = "Release"
        releaseButton.className = "release"

        releaseButton.addEventListener('click', ()=>{
          let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(pokemon.id)
          };
          fetch(POKEMONS_URL+"/destroy", configObj)
          .then(function(response){
            return response.json()
          })
          .then(function(json){
            alert(json.message)
            poke.remove()
          })
        })
        poke.innerHTML = pokemon.nickname + " (" + pokemon.species + ")"
        poke.appendChild(releaseButton)
        roster.appendChild(poke)
      }
      card.appendChild(roster)
      let main = document.querySelector("main")
      main.appendChild(card)
    }
  })
})
