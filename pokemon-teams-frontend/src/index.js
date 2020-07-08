const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// ie localhost3000/pokemon
//  url we are making request to
// url is like house address we are going to
const main = document.querySelector("main")



const loadTrainers = () => {
  fetch(TRAINERS_URL)
  // getting the api source
  .then(res => res.json())
  // formatting the api in json
  .then(json => {


    console.log("WE got this", json)
    // displaying the json format in the console
    json.forEach(trainer => {
      // iterating throughout json and on each trainer object
      // we apply it towards the renderTrainer function
      // json is like an array therefor we can apply (forEach method)
      // we invoke a function (renderTrainer) that displays each indiv trainer
      // we receive a returned object => array {}
      renderTrainer(trainer)})
      // In order to render information you need an example ( i.e = trainer)
      // we invoke this function because it allows iteraion on the trainers obj
      // renderTrainer = displays the individual trainer

    })
}


const renderTrainer = (trainer_obj) => {
  // assigning varible to function
console.log("TT",trainer_obj)
// inspect trainer hash

const div = document.createElement("div")
const p = document.createElement("p")
const button = document.createElement("button")
const ul = document.createElement("ul")
// const div = document.createElement("div")
// We create empty html elements
div.setAttribute("class", "card")
// .setAttribute("class") => attribute we want
// debugger
// .setAttribute("card") => value we set the attribute to
// setAttribute =  take 2 arguments :(1st, created Attribute), (2nd Value of Attribute)
div.setAttribute("data-id", trainer_obj.id)

  p.innerText = trainer_obj.name
  button.setAttribute("data-trainer-id", trainer_obj.id)
  button.innerText = "Add Pokemon"
  button.addEventListener("click", createPokemon)
  // after we click on the button pokemon is created
  // therefor we have to put another EventListener on the click.
  // Always keep in mind the parent and child node
   div.appendChild(p)
   div.appendChild(button)
   div.appendChild(ul)
   main.appendChild(div)

   trainer_obj.pokemons.forEach(pokemon => renderPokemon(pokemon))


   }

   const createPokemon = (e) => {
     // we place a debugger in order to analyze (e), the event handler for
     // the call back function
     // debugger

     e.preventDefault()
     const configObj = {
       // action we take once we get to the house.
       method:"POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       // what type of request we are sending.
       // i.e request from browser to backend

       body: JSON.stringify(
         {trainer_id: e.target.dataset.trainerId }
         // event object is returned with corresponding info to display specified trainer_id
         // body -> sending the actual data to backend
         // e =
         // event object
         // e.target gives us the properties we use
         // e.target.dataset = gives us the DOM string that we need for the trainerId, in order to create/ and or  add a  pokemon/
       )
     }

     fetch(POKEMONS_URL, configObj)
     // 1. url address that we are going to (POKEMONS_URL)
     // 2. the action we take once we get to that address(configObj)
     .then(res => res.json())
     // convert the response to json
     .then(json => {
       if (json.message){
         // when json gets to message we display the alert message (pokemon_controller)
         // debugger
          alert(json.message)
        } else {
          // if we do not reach that point then render the pokemon on the page.
          renderPokemon(json)
        }

     })
   }

   const releasePokemon = (e) => {
     e.preventDefault()
     // debugger
     const configObj = {
       // action we take once we get to the house.
       method:"DELETE",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       // what type of request we are sending.
       // i.e request from browser to backend

       // body: JSON.stringify(
       //   {trainer_id: e.target.dataset.trainerId }
       // -- because we are destroying an object we do not need a body ------
         // event object is returned with corresponding info to display specified trainer_id
         // body -> sending the actual data to backend
         //

     }

     fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`,configObj)
     e.target.parentElement.remove()
     // we are making the url dynamic so that we can access any of the pokemonId
     // e.target = onclick button
     // (e)----> records and hold the activity on the button
     // e.target.dataset = "data - pokemon - id"
     //  e.target.dataset.pokemonId gives us the pokemonId
     // 1. we access the address
     // 2. we perform an action at this address
//      #=> Example Request
// DELETE /pokemons/:pokemon_id





   }


   const renderPokemon = (pokemon) => {

     const ul = document.querySelector(`div[data-id = "${pokemon.trainer_id}"]`)

     const li = document.createElement("li")
     const button = document.createElement("button")
     li.innerHTML = `${pokemon.nickname}  (${pokemon.species}) `
        button.setAttribute("class", "release")
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.innerHTML = "release"
        button.addEventListener("click", releasePokemon)
        // callback function is the event function that is called  when the event takes place

        li.appendChild(button)
        ul.appendChild(li)






}




document.addEventListener("DOMContentLoaded", () => loadTrainers())
