const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
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

   const renderPokemon = (pokemon) => {

     const ul = document.querySelector(`div[data-id = "${pokemon.trainer_id}"]`)

     const li = document.createElement("li")
     const button = document.createElement("button")
     li.innerHTML = `${pokemon.nickname}  (${pokemon.species}) `
        button.setAttribute("class", "release")
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.innerHTML = "release"
        button.addEventListener("click", releasePokemon)


        li.appendChild(button)
        ul.appendChild(li)

        const createPokemon = () => {

        }


        const deletePokemon = () => {


        }


}




document.addEventListener("DOMContentLoaded", () => loadTrainers())
