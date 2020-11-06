const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", displayTrainers())

function displayTrainers(){
fetch(TRAINERS_URL)
.then(res => res.json())
.then(data => trainer = data)
.then(() => getTrainers(trainer))}

//trainer.forEach(train => console.log(train))}

function getTrainers(trainer){
let trainTeam = document.querySelector("main")
trainer.forEach(trained =>{
  let p= document.createElement("p")
  p.innerHTML = trained.id +  "."  + trained.name
  
  let div = document.createElement("div")
  let ul = document.createElement("ul")
  
  let likebutton = document.createElement("button")
  likebutton.id= trained.id
  likebutton.innerHTML = "Add Pokemon"
  likebutton.addEventListener("click", addPokemon)
  
  trained.pokemons.forEach(pokemon =>{
    let myString = " "
      li = document.createElement("li")
      myString = `${pokemon.nickname}`
      li.innerText = myString

      let button = document.createElement("button")
      button.id = pokemon.id
      button.innerHTML = "Release Pokemon"
      button.addEventListener("click", deletePokemon)
      li.append(button)
      ul.appendChild(li)})
  
  
  div.setAttribute("class", "card")
  div.append(p)
  div.append(likebutton)
  div.append(ul)
  trainTeam.appendChild(div)})}

  function addPokemon(event){
     let configObj= {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.id})
      }
      return fetch("http://localhost:3000/pokemons", configObj)
      .then(res => res.json())
      .then(data => pokemon = data)
      .then((pokemon) =>{
         let div = document.querySelectorAll("div")
         let xyz = div[event.target.id-1]
      
         let li = document.createElement("li")
         li.innerHTML = pokemon.nickname
         
         let releasebtn = document.createElement("button")
         releasebtn.id= pokemon.id
         releasebtn.innerText = "Release Pokemon"
         li.append(releasebtn)
         
         xyz.appendChild(li)   
        })
      }


      function deletePokemon(event) {
        fetch(`http://localhost:3000/pokemons/${event.target.id}`, {
          method: "DELETE",
        })
        .then(res => res.json())
        .then(poke =>{ event.target.parentElement.remove()
          console.log(poke)})
      }
      









     // function deletePokemon(event){
       // fetch("http://localhost:3000/pokemons"),
         //{
          //method: "DELETE",
          //headers: {
            //"Content-Type": "application/json",
            //"Accept": "application/json"
          // },
          // body: JSON.stringify({id: event.target.id})}
         //.then(res => res.json())
         //.then((pokemon=>{console.log(pokemon)})
         //)}
  
 
    


      
      
     
  
    

  










  

