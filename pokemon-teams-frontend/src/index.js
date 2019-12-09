const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// <div class="card" data-id="1"><p>Prince (Reference Only)</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>

// sample card for each trainer
let card;
document.addEventListener('DOMContentLoaded', () =>{
  // load content here
  card = document.body.getElementsByClassName("card")[0]

  card.addEventListener("click", event => {
    // grabs the pokemon id that needs to be released
    if (event.target.getAttribute("data-pokemon-id") != null) {
      let ulParent = event.target.parentNode.parentNode
      // console.log(event.target.parentNode)
      // update database via rails API
      ulParent.removeChild(event.target.parentNode)
      // just need to send data to update database
    }
  })
})

// need a function for releasing pokemons

// need a function for adding pokemons to the correct Trainer
